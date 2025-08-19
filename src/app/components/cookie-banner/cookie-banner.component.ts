import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent {
  mostrarBanner = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.mostrarBanner = !localStorage.getItem('cookiesAceptadas');
    }
  }

  aceptarCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookiesAceptadas', 'true');
      this.mostrarBanner = false;
    }
  }
}
