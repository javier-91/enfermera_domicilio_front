import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexioBackendService {

  private apiUrl = "http://localhost:8080";
  private http = inject(HttpClient);

  /**
   * Enviem les dades de reserva.
   * @param dades 
   * @returns 
   */
  enviarDadesReserva(dades: any): Observable<any> {
    return this.http.post(this.apiUrl+"/citas", dades);
  }
  /**
   * Enviem les dades del usuari.
   * @param dades 
   * @returns 
   */
  enviarDadesContacte(dades: any): Observable<any> {
    return this.http.post(this.apiUrl+"/contacto", dades);
  }
  /**
   * Obtenim el Token
   * @param username 
   * @param password 
   * @returns Retorna el token
   */
  getToken(username: string, password: string){
    const body = new URLSearchParams();
    body.set('grantType', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('withRefreshToken', 'true');

    return this.http.post(this.apiUrl+"/token", body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true // Añadimos esta opción para permitir que las cookies se manejen automáticamente
    })


  }

}
