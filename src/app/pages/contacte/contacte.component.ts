import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service'; 
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

@Component({
  selector: 'app-contacte',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.css']
})
export class ContacteComponent implements OnInit {
  private connexioBackend = inject(ConexioBackendService);
  form: FormGroup;
  mensajeExito: string = '';
  tipoMensaje: 'exito' | 'error' | '' = '';

  hoy: any;
  userInfo: any;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    const datePite = new DatePipe('en-Us')
    this.hoy = datePite.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
    this.form = this.fb.group({
      nom: ['', Validators.required],
      correu: ['', [Validators.required, Validators.email]],
      telefon: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      missatge: ['', [Validators.required]],
      aceptaTerminos: [false, Validators.requiredTrue]
    });

  }
    ngOnInit() {
    // Nos suscribimos al observable del servicio
    this.authService.userInfo$.subscribe(user => {
      this.userInfo = user; // Guardamos la info del usuario
    });
  }



  enviemValors() {
    console.log(this.form.value);
    const formData = this.form.value;

    const dadesEnviar = {
      nom: formData.nom,
      correu: formData.correu,
      telefon: String(formData.telefon),
      missatge: formData.missatge,
    };
    setTimeout(() => {
      this.form.reset();
      this.mensajeExito = '';
      this.tipoMensaje = '';
    }, 1500)

    this.connexioBackend.enviarDadesContacte(dadesEnviar).subscribe({
      next: (response) => {
        console.log("Cita enviada con éxito:", response);
        this.mensajeExito = "Mensaje enviada con éxito ";
        this.tipoMensaje = 'exito';
      },
      error: (error) => {
        console.error("Error al enviar cita:", error);
        this.mensajeExito = "Error al enviar mensaje ";
        this.tipoMensaje = 'error';
      }
    });

  }
}
