import { Injectable } from '@angular/core';
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL } from '@firebase/storage';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadBytes: any;

  constructor(private storage: Storage) { }

  private createFileName(file: File): string {
    // batata.jpg
    const ext = file.name.split('.').pop(); // jpg
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`; // 1674513731.jpg
  }

  // folder indica a pasta para salvar o file.
  upload(file?: File, folder?: string): Observable<string | null> {
    if(file) {
      const filename = this.createFileName(file);
      const fileRef = ref(this.storage, folder + filename);
      return from(this.uploadBytes(fileRef, file)).pipe(
        switchMap(() => from(getDownloadURL(fileRef)))
      );
    } else {
      return of(null); // não ocorre upload
    }

  }
}
