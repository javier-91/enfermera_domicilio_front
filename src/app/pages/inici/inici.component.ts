import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-inici',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './inici.component.html',
  styleUrl: './inici.component.css'
})
export class IniciComponent {

}
