import { Routes } from '@angular/router';
import { ContacteComponent } from './pages/contacte/contacte.component';
import { IniciComponent } from './pages/inici/inici.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { RegistratComponent } from './pages/Registrat/registrat.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';

export const routes: Routes = [
    { path: 'contacto', component: ContacteComponent},
    { path: 'inicio', component: IniciComponent},
    { path: 'reserva', component: ReservaComponent},
    { path: 'registrate', component: RegistratComponent},
    { path: 'login', component: LoginComponent},
    { path: 'privacidad', component: PrivacidadComponent},
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent},
    { path: 'cookies', component: CookieBannerComponent},
    { path: '', redirectTo: 'inicio', pathMatch: 'full'} // Ruta arrel redireccionarà a /inici

];
