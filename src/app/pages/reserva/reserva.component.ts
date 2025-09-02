import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { inject, OnInit } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
//Angular Material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from '../../components/menu/menu.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConexioBackendService } from '../../core/services/conexio-backend.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatCheckboxModule,
    MatNativeDateModule,
    NgFor,
    MatAutocompleteModule
  ],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  private connexioBackend = inject(ConexioBackendService);
  form: FormGroup;
  mensajeExito: string = '';
  tipoMensaje: 'exito' | 'error' | '' = '';
  resultadosDireccion: any[] = [];


  ngOnInit() {
    this.form.get('direccion')?.valueChanges.pipe(
      debounceTime(400),          // espera 400ms tras la última tecla
      distinctUntilChanged()      // solo si realmente cambió el valor
    ).subscribe(value => {
      this.buscarDireccion(value);   // le pasamos el valor filtrado
    });
  }
  hoy: any;

  constructor(private fb: FormBuilder) {
    const datePite = new DatePipe('en-Us')
    this.hoy = datePite.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
    this.form = this.fb.group({
      nom: ['', Validators.required],
      correu: ['', [Validators.required, Validators.email]],
      telefon: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      missatge: [''],
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      direccion: ['', Validators.required],
      aceptaTerminos: [false, Validators.requiredTrue],
    });

  }

  enviemValors() {
    console.log(this.form.value);
    const formData = this.form.value;
    const fechaValida = formData.fecha.toISOString().split("T")[0];
    const horaString = formData.hora;

    const dadesEnviar = {
      nom: formData.nom,
      correu: formData.correu,
      telefon: String(formData.telefon),
      missatge: formData.missatge,
      data: fechaValida,
      direccio: formData.direccion,
      enfermera: 'Katherine',
      hora: horaString,
      minutosServicio: 60
    };
    setTimeout(() => {
      this.mensajeExito = '';
      this.tipoMensaje = '';
      this.form.reset();
    }, 1500)

    this.connexioBackend.enviarDadesReserva(dadesEnviar).subscribe({
      next: (response) => {
        console.log("Cita enviada con éxito:", response);
        this.mensajeExito = "Mensaje enviada con éxito ";
        this.tipoMensaje = 'exito';

      },
      error: (error) => {
        console.error("Error al enviar cita:", error);
        this.mensajeExito = "Error al enviar cita ";
        this.tipoMensaje = 'error';
      }
    });

  }
  /**
 * Realiza una búsqueda de direcciones utilizando el servicio de backend que llama
 * al endpoint de Google Autocomplete.  
 * Se ejecuta cada vez que el usuario escribe en el campo de dirección.
 * 
 * - Si la longitud del texto es mayor a 2 caracteres, llama al backend para obtener sugerencias.
 * - Si hay un error en la petición, se imprime en la consola.
 * - Actualiza el array `resultadosDireccion` con las sugerencias obtenidas.
 */
  buscarDireccion(input: string) {
    if (input && input.length > 2) {
      console.log("Petición a backend:", input);
      this.connexioBackend.getAutocomplete(input).subscribe({
        next: res => this.resultadosDireccion = res.predictions || [],
        error: err => console.error('Error al obtener direcciones', err)
      });
    } else {
      this.resultadosDireccion = [];
    }
  }



  /**
 * Selecciona una dirección de la lista de sugerencias.  
 * 
 * - Actualiza el campo 'direccion' del formulario con la descripción de la dirección seleccionada.
 * - Limpia el array `resultadosDireccion` para ocultar las sugerencias.
 *
 * @param direccion Objeto que representa la sugerencia de dirección seleccionada, 
 *                  normalmente contiene al menos la propiedad `description`.
 */
  seleccionarDireccion(valor: string) {
    this.form.get('direccion')?.setValue(valor);
    this.resultadosDireccion = [];
  }
}
