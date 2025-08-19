import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { FooterComponent } from '../../components/footer/footer.component';
@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './privacidad.component.html',
  styleUrl: './privacidad.component.css'
})
export class PrivacidadComponent {

}
