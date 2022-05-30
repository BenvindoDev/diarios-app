import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { doc, Firestore,} from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateEmail, updateProfile } from '@firebase/auth';
import { collection, setDoc } from '@firebase/firestore';
import { from, tap } from 'rxjs';
// Firebase versão  modular
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth, // Serviços do firebase authentication
    private db: Firestore, // serviços do banco firestore do firebase
    private router: Router // mudar de rota de forma imperativa
  ) {}

  uid?: string; // guarda o ID único do usuário logado

  get logged() {
    return  authState(this.auth).pipe(
      tap((user) => {
        // conforme o usuário loga/desloga
        // é atualizado o valor de id
        this.uid = user?.uid;
      })
    );
  }

  usuarios = collection(this.db, 'usuarios'); // referencia uma possível coleção no firestore

  signupEmail(email: string, password: string, nome: string, nick: string) {
    // Se comunica com o auth e cria um usuário a partir do email e senha
    // Pode ocorrer erros por isso é importante retornar o observable
    // para monitorar o ocorrido.
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(tap((creds) => {
      const user = creds.user; // informações do usuário logado
      const userDoc = doc(this.usuarios, user.uid); // referencia um documento de usuário no firestore 
      updateProfile(user, {displayName: nome});
      // seta os dados do objeto dentro do documento com o mesmo id do usuário cadastrado
      setDoc(userDoc, {
        uid: user.uid, 
        email: email, 
        nome: nome, 
        nick: nick
      });
      this.emailVerificacao(creds.user);
      })
    );
  }

  loginEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((creds) => {
        this.emailVerificacao(creds.user);
      })
    );
  }

  logout(rota: '/login' | '/confirmar-email') {
    // Desloga o usuário e ao final navega para uma rota determinada
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.router.navigate([rota]); // redireciona para a rota escolhida
      })
    );
  }

  emailVerificacao(user: any) {
    if(!user.emailVerified) {
      sendEmailVerification(user);
      this.logout('/confirmar-email').subscribe();
    } else {
      this.router.navigate(['/']);
    }
  }

  loginGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      tap((creds) => {
        const user = creds.user;
        const userDoc = doc(this.usuarios, user.uid);
        setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          nome: user.displayName, // 'displayName' contém o nome do usuário do google
          nick: 'Um usuário do Google!',
        });

        this.router.navigate(['/']);
      })
    );
  }

  recoverPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }
}
