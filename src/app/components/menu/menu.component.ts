import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-menu',
  imports: [NgIf, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  rutaActual = "";
  rutaInicio = "/";
  userInfo$: any;

  authService = inject(AuthService);
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.rutaActual = this.router.url;
    });
  }


  esActivo(ruta: string): boolean {
    if (ruta === this.rutaInicio) {
      return true;
    }
    return this.rutaActual === ruta;
  }
}
