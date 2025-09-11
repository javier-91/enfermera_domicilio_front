import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MenuComponent } from '../../../components/menu/menu.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CitaEvent } from '../../../core/models/cita-event.model';
import { CitasService } from '../../../core/services/citas.service';
import { MatDialog } from '@angular/material/dialog';
import { CitaDetalleDialogComponent } from '../cita-detalle-dialog/cita-detalle-dialog.component';
import { CitaCrearHorarioDialogComponent } from '../cita-crear-horario-dialog/cita-crear-horario-dialog.component';
import { CitaCrearDialogComponent } from '../cita-crear-dialog/cita-crear-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { Cita } from '../../../core/models/cita.models';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FooterComponent, MatDatepickerModule, MatNativeDateModule, MenuComponent, HeaderComponent, AsyncPipe, NgIf, FullCalendarModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {

  userInfo: any;
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private citasService: CitasService = inject(CitasService);
  private dialog: MatDialog = inject(MatDialog);
  private citaBackend: Cita | null = null;



  /**
   * Devuelve un saludo según la hora
   */
  getSaludo(): string {
    const hora = new Date().getHours(); // Obtiene la hora actual (0-23)
    if (hora < 12) return 'Buenos días';
    if (hora < 20) return 'Buenas tardes';
    return 'Buenas noches';
  }

  /** Opciones estilo Google Calendar */
  calendarOptions: CalendarOptions = {
    // Plugins
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,

    // Vistas
    initialView: 'timeGridWeek',      // semana por horas como Google
    firstDay: 1,                      // lunes
    slotMinTime: '00:00:00',
    slotMaxTime: '24:00:00',
    slotDuration: '01:00:00',
    expandRows: true,
    dayMaxEventRows: 3,
    nowIndicator: true,
    height: 'auto',                   // que crezca con el contenido
    stickyHeaderDates: true,

    // Cabecera moderna
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    // Interacción
    selectable: true,                 // seleccionar rangos arrastrando
    selectMirror: true,
    editable: true,                   // mover y redimensionar eventos
    eventStartEditable: true,
    eventDurationEditable: true,
    select: (arg) => this.onSelectRange(arg),
    eventClick: (arg) => this.onEventClick(arg),
    eventDrop: (arg) => this.onEventDrop(arg),
    eventResize: (arg) => this.onEventResize(arg),

    events: (fetchInfo, successCallback, failureCallback) => {
      this.citasService.loadCitas().subscribe({
        next: (citas) => successCallback(citas.map(c => this.mapCitaToEvent(c))),// next--> se llama cuando la petición al backend devuelve datos
        error: (err) => failureCallback(err)
      });
    },


    // Estética básica (los colores finos los hacemos en el CSS)
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    }
  };

  abrirNuevaCita() {
    //Abrimos diálogo
    const dialogRef = this.dialog.open(CitaCrearDialogComponent, {
      width: '500px',
      position: { top: '120px' },
      data: {
        modo: "crear"
      },

    });

    // Acciones tras cerrar el diálogo
    dialogRef.afterClosed().subscribe(result => {
        console.log(result.cita.hora);
        const startDate = new Date(result.cita.start); // asegura que es Date
        startDate.setHours(12, 0, 0, 0); // medio día evita problemas de cambio horario
        console.log(startDate);
        // Combinar hora y AM/PM en un string
        const horaString = `${result.cita.horaValue} ${result.cita.horaPeriod}`;
        this.citaBackend = {
          nom: result.cita.paciente,           // paciente -> nom
          correu: result.cita.correo,          // correo -> correu
          telefon: result.cita.telefono,
          direccio: result.cita.direccion,
          enfermera: result.cita.enfermera,
          hora: horaString,
          data: startDate.toISOString().split('T')[0],  // YYYY-MM-DD
          missatge: result.cita.mensaje,
          minutosServicio: result.cita.minutosServicio
        };

        this.citasService.addCita(this.citaBackend).subscribe(() => {

        });
      
    });
  }

  /** Crear evento al seleccionar un rango */
  private onSelectRange(arg: DateSelectArg) {
    const cita: CitaEvent = {
      id: String(Date.now()), // generas un id temporal
      title: '',
      start: arg.start.toISOString(),
      end: arg.end.toISOString(),
      paciente: '',
      enfermera: '',
      correo: '',
      telefono: '',
      direccion: '',
      mensaje: '',
      estado: 'pendiente'
    };

    const dialogRef = this.dialog.open(CitaCrearHorarioDialogComponent, {
      width: '500px',
      position: { top: '120px' },
      data: {
        cita,
        modo: "crear"
      },
    });
    // Acciones tras cerrar el diálogo
    dialogRef.afterClosed().subscribe(result => {
      //TIEMPO SERVICIO
      const start = arg.start; // Date de inicio
      const end = arg.end;     // Date de fin
      const diffMs = end.getTime() - start.getTime();// Diferencia en milisegundos
      const minutosSeleccionados = diffMs / (1000 * 60);// Convertir a minutos
      //DATE
      const startDate = new Date(result.cita.start); // asegura que es Date
      startDate.setHours(12, 0, 0, 0); // medio día evita problemas de cambio horario

      this.citaBackend = {
        nom: result.cita.paciente,           // paciente -> nom
        correu: result.cita.correo,          // correo -> correu
        telefon: result.cita.telefono,
        direccio: result.cita.direccion,
        enfermera: result.cita.enfermera,
        hora: arg.startStr,
        data: arg.start.toISOString().split('T')[0],  // YYYY-MM-DD
        missatge: result.cita.mensaje,
        minutosServicio: minutosSeleccionados
      };

      this.citasService.addCita(this.citaBackend).subscribe(() => {
        const calendarioApi = arg.view.calendar;
        calendarioApi.refetchEvents(); //Recarga todos los eventos.
      });

    });
    arg.view.calendar.unselect();
  }

  /**
   * Maneja el clic en un evento (editar/eliminar)
   * @param arg El argumento del evento
   */
  private onEventClick(arg: EventClickArg) {
    const cita: CitaEvent = {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start?.toISOString() ?? '',
      end: arg.event.end?.toISOString() ?? '',
      ...arg.event.extendedProps // recupera props adicionales (paciente, enfermera, etc.)
    };

    //Abrimos diálogo
    const dialogRef = this.dialog.open(CitaDetalleDialogComponent, {
      width: '500px',
      position: { top: '120px' },
      data: {
        cita,
        modo: "editar"
      },

    });

    // Acciones tras cerrar el diálogo
    dialogRef.afterClosed().subscribe(result => {
      //Eliminar cita en backend y quitarla del calendario
      if (result?.action === 'delete') {
        this.citasService.deleteCita(cita.id).subscribe(() => {
          arg.event.remove();
        });
      }
      if (result?.action === 'edit') {
        console.log(result.cita.hora);
        const startDate = new Date(result.cita.start); // asegura que es Date
        startDate.setHours(12, 0, 0, 0); // medio día evita problemas de cambio horario
        console.log(startDate);
        // Combinar hora y AM/PM en un string
        const horaString = `${result.cita.horaValue} ${result.cita.horaPeriod}`;
        this.citaBackend = {
          id: result.cita.id,
          nom: result.cita.paciente,           // paciente -> nom
          correu: result.cita.correo,          // correo -> correu
          telefon: result.cita.telefono,
          direccio: result.cita.direccion,
          enfermera: result.cita.enfermera,
          hora: horaString,
          data: startDate.toISOString().split('T')[0],  // YYYY-MM-DD
          missatge: result.cita.mensaje,
          minutosServicio: result.cita.minutosServicio
        };

        this.citasService.updateCita(this.citaBackend).subscribe(() => {
          const calendarioApi = arg.view.calendar;
          calendarioApi.refetchEvents(); //Recarga todos los eventos.
        });
      }
    });
  }

  /** Drag & drop */
  private onEventDrop(arg: EventDropArg) {
    // TODO: PUT a tu API con nuevas fechas
    // this.api.put(`/events/${arg.event.id}`, { start: arg.event.start, end: arg.event.end }).subscribe();
    console.log('Moved to', arg.event.start, arg.event.end);
  }

  /** Resize */
  private onEventResize(arg: any) {
    // TODO: PUT a tu API con nueva duración
    // this.api.put(`/events/${arg.event.id}`, { start: arg.event.start, end: arg.event.end }).subscribe();
    console.log('Resized to', arg.event.start, arg.event.end);
  }
  /**
   * Mapea una cita a un evento de calendario
   * @param cita La cita event a mapear
   * @returns El evento de calendario correspondiente
   */
  private mapCitaToEvent(cita: any): CitaEvent {
    let fecha: Date;

    // Caso 1: la hora ya viene en formato ISO que FullCalendar entiende directamente
    if (!isNaN(Date.parse(cita.hora))) {
      fecha = new Date(cita.hora);
    } else {
      // Caso 2: hora en formato 12h (AM/PM)
      const [hora, modifier] = cita.hora.split(' ');
      let [hours, minutes] = hora.split(':').map(Number);

      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      // Creamos la fecha combinando el día con la hora
      fecha = new Date(cita.data);
      fecha.setHours(hours, minutes, 0, 0);
    }

    // Calculamos la hora de fin sumando la duración (en minutos)
    const duration = cita.minutosServicio || 60; // fallback a 60 min
    const end = new Date(fecha.getTime() + duration * 60000);

    return {
      id: String(cita.id),
      title: `${cita.nom}${cita.enfermera ? ' - ' + cita.enfermera : ''}`,
      start: fecha.toISOString(),
      end: end.toISOString(),
      paciente: cita.nom,
      enfermera: cita.enfermera,
      correo: cita.correu,
      telefono: cita.telefon,
      direccion: cita.direccio,
      mensaje: cita.missatge,
      estado: 'confirmada'
    };
  }
}



