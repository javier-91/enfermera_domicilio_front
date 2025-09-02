import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
//Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from '../../components/menu/menu.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConexioBackendService } from '../../core/services/conexio-backend.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
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
    MatIconModule
  
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  private connexioBackend = inject(ConexioBackendService);
  form: FormGroup;
  mensajeExito: string = '';
  hide = true;
  password = '';
  userInfo$: any;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      usuari: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  toggleVisibility() {
    this.hide = !this.hide;
  }

  enviemValors() {
    if (this.form.invalid) return;

    const { usuari, password } = this.form.value;

    this.connexioBackend.getToken(usuari, password).subscribe({
      next: (res: any) => {
        if (res && res.status === "ok") {
          console.log("Login correcto, tokens guardados en cookies");
          this.router.navigate(['/citas']);
        } else {
          console.log("Error en login");
        }

      },
      error: (err) => {
        if (err.status === 401) {
          this.mensajeExito = "Credenciales inválidas";
        } else {
          this.mensajeExito = "Error al conectar con el servidor";
        }
      }
    });
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }
}
