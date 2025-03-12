import { Component, AfterViewInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import anime from 'animejs/lib/anime.es.js'; 
import { isPlatformBrowser } from '@angular/common'; 
import { PLATFORM_ID } from '@angular/core';
import { CarroselComponent } from "../../components/carrosel/carrosel.component"; 
import { MenuComponent } from '../../components/menu/menu.component';


@Component({
  selector: 'app-inici', 
  standalone: true, 
  imports: [FooterComponent, HeaderComponent, CarroselComponent, MenuComponent], 
  templateUrl: './inici.component.html', 
  styleUrls: ['./inici.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush // Mejora el rendimiento
})
export class IniciComponent  {

  

}
