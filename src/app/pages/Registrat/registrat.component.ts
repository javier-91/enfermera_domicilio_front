import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { inject } from '@angular/core';
//Angular Material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from '../../components/menu/menu.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConexioBackendService } from '../../services/conexio-backend.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-registrat',
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
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './registrat.component.html',
  styleUrls: ['./registrat.component.css']
})
export class RegistratComponent {
  private connexioBackend = inject(ConexioBackendService);
  form: FormGroup;
  mensajeExito: string = '';
  hide = true;
  password = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      password : ['', Validators.required],
      correu: ['', [Validators.required, Validators.email]],
      telefon: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      aceptaTerminos: [false, Validators.requiredTrue]
    });

  }


  toggleVisibility() {
    this.hide = !this.hide;
  }

  enviemValors() {
    console.log(this.form.value);
    const formData = this.form.value;

    const dadesEnviar = {
      nom: formData.nom,
      password: formData.password,
      correu: formData.correu,
      telefon: String(formData.telefon)
    };
    setTimeout(() => {
      this.mensajeExito = "Registro exitoso, revise tu correo para activar tu cuenta. ✅";
      this.form.reset();
  }, 1500)

    this.connexioBackend.enviarDadesContacte(dadesEnviar).subscribe({
      next: (response) => {
        console.log("Formulario enviado con éxito:", response);
        
      },
      error: (error) => {
        console.error("Error al enviar formulario:", error);
      }
    });

  }
}
