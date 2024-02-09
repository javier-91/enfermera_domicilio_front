import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/pages/login/login.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { InicioComponent } from './feature/inicio/inicio.component';

export const routes: Routes = [
    { path: '', component:InicioComponent},
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuSuperiorComponent },
];
