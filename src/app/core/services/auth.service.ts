// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que el servicio sea singleton y disponible en toda la app
})
export class AuthService {

  private userInfoSubject$ = new BehaviorSubject<any>(null);//almacen privado
  userInfo$ = this.userInfoSubject$.asObservable();//almacen publico

  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient, private router: Router) { }

  /**
 * Obtiene la información del usuario logueado ROLE + NOMBRE
 * o refresca desde backend si se fuerza con `refresh = true`
 */
  getUserInfo(refresh = false): Observable<any> {
    if (!refresh && this.userInfoSubject$.value !== null) {
      // 👉 ya tenemos cacheado el user, lo devolvemos sin llamar al backend
      return of(this.userInfoSubject$.value);
    }
    return this.http.get<any>(`${this.apiUrl}/user/info`, { withCredentials: true }).pipe(
      tap(user => {
        console.log("🔹 AuthService: getUserInfo() ha recibido:", user);
        //this.loggedIn$.next(!!user);
        this.userInfoSubject$.next(user);
      }),
      catchError(err => {
        console.warn('⚠️ AuthService: getUserInfo() fallo:', err);
        //this.loggedIn$.next(false);
        this.userInfoSubject$.next(null); // aseguramos valor por defecto
        return of(null);
      })
    );
  }

  /**
   * Devuelve un Observable para suscribirse al estado de login
   * @returns Observable<boolean>
   */
  isLoggedIn(): Observable<boolean> {
    this.getUserInfo();
    //return this.loggedIn$.asObservable();
        return this.userInfo$.pipe(
      map(userInfo => !!userInfo)
    );
  }

  /**
   * Cierra sesión:
   * - Cambia el estado de login a false
   * - Redirige al login
   */
  logout() {
    this.userInfoSubject$.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Obtiene los roles del usuario logueado
   * @returns Observable<string[]>
   */
  getRoles(): Observable<string[]> {
    return this.userInfo$.pipe(
      map(userInfo => userInfo?.roles || [])
    );
  }


}
