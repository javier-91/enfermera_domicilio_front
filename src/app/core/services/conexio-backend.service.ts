import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, } from 'rxjs';
import { tap } from 'rxjs/operators'; // <- IMPORT CORRECTO PARA RXJS 7+
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ConexioBackendService {

  private apiUrl = "http://localhost:8080";
  private http = inject(HttpClient); // Inyectamos HttpClient moderno usando inject()
  private authService = inject(AuthService);

  // ==========================
  // Funciones para reserva/contacto
  // ==========================

  /**
   * Envia datos de reserva al backend
   */
  enviarDadesReserva(dades: any): Observable<any> {
    return this.http.post(this.apiUrl + "/citas", dades);
  }

  /**
   * Envia datos de contacto al backend
   */
  enviarDadesContacte(dades: any): Observable<any> {
    return this.http.post(this.apiUrl + "/contacto", dades);
  }

  // ==========================
  // Autenticación (login)
  // ==========================

  /**
   * Obtiene accessToken y refreshToken
   */
  getToken(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grantType', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('withRefreshToken', 'true');

    return this.http.post(this.apiUrl + "/token", body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true // Permite que las cookies (refresh token) se envíen automáticamente
    }).pipe(
      tap(() => this.authService.getUserInfo()),// Carga info de usuario tras login
    );

  }

  /**
 * Intenta refrescar el access token usando la cookie HttpOnly (refresh token)
 * - Hace una petición POST a /api/refresh-token
 * - withCredentials: true permite enviar la cookie HttpOnly
 * @returns Observable<any>
 */
  refreshToken(): Observable<any> {
    console.log("🔹 AuthService: refreshToken() iniciado");

    return this.http.post(this.apiUrl + '/token/refresh', {}, { withCredentials: true }).pipe(
      tap((res: any) => {
        console.log("🔹 AuthService: respuesta del backend recibida:", res);
        console.log("🔹 AuthService: las cookies HttpOnly se envían automáticamente, no accesibles desde Angular");

        if (res && res.message) {
          console.log("🔹 AuthService: backend confirma sesión activa:", res.message);
          
        } else {
          console.warn("⚠️ AuthService: backend respondió sin mensaje, probablemente sesión expirada");
        }
      }),
      catchError((err) => {
        console.error("❌ AuthService: error en refreshToken()", err);
        throw err;
      })
    );
  }



}
