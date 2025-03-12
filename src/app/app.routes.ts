import { Routes } from '@angular/router';
import { ContacteComponent } from './pages/contacte/contacte.component';
import { IniciComponent } from './pages/inici/inici.component';
export const routes: Routes = [
    { path: 'contacto', component: ContacteComponent},
    { path: 'inicio', component: IniciComponent},
    { path: '', redirectTo: 'inicio', pathMatch: 'full'} // Ruta arrel redireccionarà a /inici

];
