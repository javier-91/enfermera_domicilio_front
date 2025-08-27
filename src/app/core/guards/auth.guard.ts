// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConexioBackendService } from '../services/conexio-backend.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private conexioBackend: ConexioBackendService = inject(ConexioBackendService);
    private auth: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    canActivate(): Observable<boolean> {
        console.log("🔹 AuthGuard: verificando si el usuario está autenticado...");

        // Intentamos refrescar el token usando la cookie HttpOnly
        return this.conexioBackend.refreshToken().pipe(
            tap(() => console.log("🔹 AuthGuard: refreshToken() se ejecutó")),
            map((res) => {
                console.log("🔹 AuthGuard: refreshToken() exitosa, permitiendo acceso al route", res),
                    this.auth.getUserInfo();
                return true; // Si la petición fue exitosa, dejamos pasar
            }),
            catchError((err) => {
                console.error("❌ AuthGuard: refreshToken() falló as", err);
                this.router.navigate(['/login']); // Redirigimos al login
                return of(false);
            })
        );
    }
}
