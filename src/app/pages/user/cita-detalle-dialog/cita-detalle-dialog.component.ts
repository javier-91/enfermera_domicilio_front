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
import {  MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cita-detalle-dialog',
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
  standalone: true,
  templateUrl: './cita-detalle-dialog.component.html',
  styleUrls: ['./cita-detalle-dialog.component.css']
})
export class CitaDetalleDialogComponent {
  form: FormGroup;
  hoy: any;
  constructor(
    public dialogRef: MatDialogRef<CitaDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cita: CitaEvent }, private fb: FormBuilder



  ) {
    const datePipe = new DatePipe('en-US');
    this.hoy = datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');

    this.form = this.fb.group({
      paciente: [this.data.cita.paciente, Validators.required],
      enfermera: [this.data.cita.enfermera, Validators.required],
      correo: [this.data.cita.correo, [Validators.required, Validators.email]],
      telefono: [this.data.cita.telefono, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      direccion: [this.data.cita.direccion, Validators.required],
      mensaje: [this.data.cita.mensaje],
      estado: [this.data.cita.estado, Validators.required],
      start: [this.data.cita.start, Validators.required],
      end: [this.data.cita.end, Validators.required],
      id: [this.data.cita.id],
      minutosServicio: [this.data.cita.minutosServicio || 60, Validators.required] // si quieres que sea editable
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
  
  enviemValors() {
    console.log(this.form.value);
  }
}

