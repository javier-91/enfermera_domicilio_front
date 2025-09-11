import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { CitaEvent } from '../../../core/models/cita-event.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
//MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cita-crear-dialog',
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatOption, MatSelectModule],
  standalone: true,
  templateUrl: './cita-crear-dialog.component.html',
  styleUrls: ['./cita-crear-dialog.component.css']
})
export class CitaCrearDialogComponent {
  form: FormGroup;
  hoy: any;
 

  horas: string[] = Array.from({ length: 12 }, (_, i) => `${i + 1}:00`); // 1 a 12
  periodos: string[] = ['AM', 'PM'];

  constructor(
    public dialogRef: MatDialogRef<CitaCrearDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cita: CitaEvent; modo: 'crear' }, private fb: FormBuilder



  ) {
    const datePipe = new DatePipe('en-US');
    this.hoy = datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
  
    this.form = this.fb.group({
      paciente: [null, Validators.required],
      enfermera: [null, Validators.required],
      start: [null, Validators.required],
      horaValue: [null, Validators.required],
      horaPeriod: [null, Validators.required],
      minutosServicio: [null, Validators.required], // si quieres que sea editable
      correo: [null, [Validators.required, Validators.email]],
      telefono: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: [null, Validators.required],
      mensaje: [null],
      estado: [null, Validators.required]
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  eliminar() {
    this.dialogRef.close({ action: 'delete', cita: this.data.cita });
  }

  /**
   * Devolvemos los datos editados de la cita, al componente padre.
   */
  editar() {
    this.dialogRef.close({ action: 'edit', cita: this.form.value });
  }

}

