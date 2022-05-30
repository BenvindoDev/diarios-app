import { Injectable } from '@angular/core';
import {
  collectionData,
  docData,
  Firestore,
  where,
} from '@angular/fire/firestore';
import { collection, doc, query } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DiariosService {
  constructor(private db: Firestore, private authService: AuthService) {}
  // Referência a uma possível coleção do firestore
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]> {
    // collectionData - extrai listagem dos diários da coleção
    // { idField: 'id' } - solicita p/ o banco adicionar essa propriedade dentro do objeto já preenchida
    return collectionData(this.diarios, { idField: 'id' });
  }

  getDiariosUsuario(): Observable<Diario[]> {
    return collectionData(
      query(this.diarios, where('usuarioId', '==', this.authService.uid)),
      { idField: 'id' }
    );
  }

  getDiarioById(id: string): Observable<Diario> {
    const diarioDoc = doc(this.diarios, id); // indica o local do documento na coleção
    return docData(diarioDoc, { idField: 'id' });
  }
}