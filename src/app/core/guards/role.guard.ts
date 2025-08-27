import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRole = route.data['role']; // role de la ruta ('admin', 'user', etc.)

    return this.auth.getRoles().pipe( // Método que obtiene los roles del usuario logueado
      map((roles: string[]) => {
        if (roles.includes(requiredRole)) {
          return true; // Tiene permiso
        } else {
          this.router.navigate(['/login']); // No tiene permiso
          return false;
        }
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
