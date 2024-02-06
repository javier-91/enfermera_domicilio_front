import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  template: `
  <div>
    <h2>Menú Interactivo</h2>
    <div id="menu">
      <span (click)="seleccionarOpcion('opcion1')">Opción 1</span>
      <span (click)="seleccionarOpcion('opcion2')">Opción 2</span>
      <span (click)="seleccionarOpcion('opcion3')">Opción 3</span>
</div>
  </div>
  <div ngIf="opcionSeleccionada">
    <h3>Contenido de la Opción Seleccionada</h3>
    <p>{{ opcionSeleccionada }}</p>
  </div>
`,
  styles: `
  div {
      background-color: #f8f8f8;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: 20px;
    }

    h2 {
      color: #333;
    }

    ul {
      list-style-type: none;
      padding: 0;
      cursor: pointer;
    }

    #menu span{
      width:100px;
      margin: 0 0 100px 10px;
      padding: 8px;
      background-color: #3498db;
      color: #fff;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    #menu span:hover {
      background-color: #297fb8;
    }

    div [ngIf] {
      margin-top: 20px;
    }

    h3 {
      color: #333;
    }

    p {
      color: #555;
    }
  `,
})
export class MenuComponent {
  opcionSeleccionada: string | null = null;

  seleccionarOpcion(opcion: string): void {
    this.opcionSeleccionada = `Has seleccionado: ${opcion}`;
  }
}

