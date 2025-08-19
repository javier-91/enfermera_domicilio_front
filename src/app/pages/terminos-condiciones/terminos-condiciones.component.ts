import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { FooterComponent } from '../../components/footer/footer.component';
@Component({
  selector: 'app-terminos-condiciones',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent {

}
