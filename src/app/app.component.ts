import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  title = 'VitKat';
  userInfo: any = null;

  ngOnInit(): void {
    // Dispara la petición y actualiza userInfoSubject$
    this.authService.getUserInfo();

    // Si quieres ver los cambios:
    this.authService.getUserInfo().subscribe(user => {
      console.log("📌 Usuario cargado en AppComponent:", user);
    });

    // Nos suscribimos a los cambios de usuario
    this.authService.userInfo$.subscribe(user => {
      this.userInfo = user;
      console.log("📌 Usuario cargado en AppComponent:", user);
    });

  }

}
