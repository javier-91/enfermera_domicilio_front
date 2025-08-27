import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Router } from '@angular/router';
import { CarroselComponent } from '../../../components/carrosel/carrosel.component';
import { AuthService } from '../../../core/services/auth.service';
import { MenuComponent } from '../../../components/menu/menu.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FooterComponent, CarroselComponent, MenuComponent, HeaderComponent, AsyncPipe, NgIf],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  userInfo: any;
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  

  /**
   * Devuelve un saludo según la hora
   */
  getSaludo(): string {
    const hora = new Date().getHours(); // Obtiene la hora actual (0-23)
    if (hora < 12) return 'Buenos días';
    if (hora < 20) return 'Buenas tardes';
    return 'Buenas noches';
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }
}