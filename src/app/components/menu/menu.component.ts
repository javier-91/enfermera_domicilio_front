import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  } from 'express';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  rutaActual="";
  rutaInicio="/";

  constructor(private router:Router) {
    this.router.events.subscribe(() => {
      this.rutaActual = this.router.url;
    });
  }
  esActivo(ruta:string): boolean {
    if (ruta===this.rutaInicio){
      return true;
    }
    return this.rutaActual === ruta;
  }
}
