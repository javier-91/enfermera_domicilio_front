import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexioBackendService {

  private apiUrl = "http://localhost:8080/citas";
  private http = inject(HttpClient);

  enviarDades(dades: any): Observable<any> {
    return this.http.post(this.apiUrl, dades);
  }

}
