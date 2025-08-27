import { Component, AfterViewInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { CarroselComponent } from "../../components/carrosel/carrosel.component";
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-inici',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CarroselComponent, MenuComponent],
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IniciComponent implements AfterViewInit {
  private router: Router = Inject(Router);

  async ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const AOS = await import('aos');
      AOS.init();
    }
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }
}