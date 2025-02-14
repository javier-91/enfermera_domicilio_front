import { Routes } from '@angular/router';
import { ContacteComponent } from './pages/contacte/contacte.component';
import { IniciComponent } from './pages/inici/inici.component';
export const routes: Routes = [
    { path: 'contacte', component: ContacteComponent},
    { path: 'inici', component: IniciComponent},
    { path: '', redirectTo: 'inici', pathMatch: 'full'} // Ruta arrel redireccionarà a /inici

];
