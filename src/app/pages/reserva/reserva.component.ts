import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { inject } from '@angular/core';
import { DatePipe } from '@angular/common';
//Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from '../../components/menu/menu.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConexioBackendService } from '../../services/conexio-backend.service';

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
    MatNativeDateModule
  ],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  private connexioBackend = inject(ConexioBackendService);
  form: FormGroup;
  mensajeExito: string = '';

  hoy: any;

  constructor(private fb: FormBuilder) {
    const datePite = new DatePipe('en-Us')
    this.hoy = datePite.transform(new Date().setDate(new Date().getDate()+1), 'yyyy-MM-dd');
    this.form = this.fb.group({
      nom: ['', Validators.required],
      correu: ['', [Validators.required, Validators.email]],
      telefon: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      missatge: [''],
      fecha : [null, Validators.required],
      hora : [null, Validators.required]
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
      hora: horaString 
    };
    setTimeout(() => {
      this.mensajeExito = "Cita enviada con éxito ✅";
      this.form.reset();
  }, 1500)

    this.connexioBackend.enviarDadesReserva(dadesEnviar).subscribe({
      next: (response) => {
        console.log("Cita enviada con éxito:", response);
        
      },
      error: (error) => {
        console.error("Error al enviar cita:", error);
      }
    });

  }
}
