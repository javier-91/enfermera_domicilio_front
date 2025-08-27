import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  canActivate(): Observable<boolean> {

    console.log('LoginGuard: iniciando verificación de acceso a /login');

    return this.authService.getUserInfo().pipe(
      take(1), // tomamos solo el primer valor emitido
      //filter(loggedIn => loggedIn !== null), // espera hasta que loggedIn tenga valor
      map(user => {
        if (user) {
          console.log('LoginGuard: usuario logueado, redirigiendo a /perfil');
          this.router.navigate(['/perfil']);
          return false; // bloquea acceso a /login
        }
        console.log('LoginGuard: usuario no logueado, permitiendo acceso a /login');
        return true; 
      }),
    // Maneja errores (como 401)
    // Si getUserInfo lanza un error, asumimos que no está logueado
    catchError(err => {
      console.log('LoginGuard: error al obtener usuario, permitiendo acceso a /login', err);
      return of(true);
    })
    );
  }
}
