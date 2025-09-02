import { Routes } from '@angular/router';
import { ContacteComponent } from './pages/contacte/contacte.component';
import { IniciComponent } from './pages/inici/inici.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { RegistratComponent } from './pages/Registrat/registrat.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginGuard } from './core/guards/login.guard';
import { CitasComponent } from './pages/user/citas/citas.component';

export const routes: Routes = [
    { path: 'contacto', component: ContacteComponent},
    { path: 'inicio', component: IniciComponent},
    { path: 'reserva', component: ReservaComponent},
    { path: 'registrate', component: RegistratComponent},
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'privacidad', component: PrivacidadComponent},
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent},
    { path: 'cookies', component: CookieBannerComponent},
    { path: 'citas', component: CitasComponent, canActivate: [AuthGuard],
        //children: [
            //{ path: 'perfil', component: PerfilComponent },
            //{ path: 'reservas', component: ReservasComponent },
           // { path: '', redirectTo: 'perfil', pathMatch: 'full' }] 
    },
    //{ path: 'admin', component: PerfilComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' },
        //children:[
            //{ path: 'usuarios', component: UsuariosComponent },
            //{ path: 'reservas', component: ReservasComponent },
        //] },
    { path: '**', redirectTo: 'login' },
    { path: '', redirectTo: 'inicio', pathMatch: 'full'} // Ruta arrel redireccionarà a /inici

];
