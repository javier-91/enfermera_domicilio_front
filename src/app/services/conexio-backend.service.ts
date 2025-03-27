import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexioBackendService {

  private apiUrl = "http://localhost:8080";
  private http = inject(HttpClient);

  enviarDadesReserva(dades: any): Observable<any> {
    return this.http.post(this.apiUrl+"/citas", dades);
  }
  enviarDadesContacte(dades: any): Observable<any> {
    return this.http.post(this.apiUrl+"/contacto", dades);
  }

}
