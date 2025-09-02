export interface Cita {
  id?: string;                 // ID de la cita (opcional si es nueva)
  nom?: string;                // Nombre del paciente
  correu?: string;             // Correo del paciente
  telefon?: string;            // Teléfono del paciente
  direccio?: string;           // Dirección del paciente
  enfermera?: string;          // Enfermera asignada
  data?: string;               // Fecha de la cita en formato ISO (YYYY-MM-DD)
  hora?: string;               // Hora de la cita (HH:mm)
  missatge?: string;           // Mensaje adicional
  minutosServicio?: number;    // Duración del servicio en minutos
}
