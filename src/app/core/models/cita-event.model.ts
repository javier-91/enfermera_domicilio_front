export interface CitaEvent {
  id: string;                           // ID de la cita
  title: string;                        // Título que se mostrará en el calendario
  start: string;                        // Fecha y hora de inicio en formato ISO
  end: string;                          // Fecha y hora de fin en formato ISO
  paciente?: string;                    // Nombre del paciente
  enfermera?: string;                   // Nombre de la enfermera
  correo?: string;                      // Correo del paciente
  telefono?: string;                     // Teléfono del paciente
  direccion?: string;                   // Dirección de la cita
  mensaje?: string;                     // Mensaje adicional
  minutosServicio?: number;               // Duración del servicio en horas
  estado?: 'pendiente' | 'confirmada' | 'cancelada'; // Estado de la cita
}
