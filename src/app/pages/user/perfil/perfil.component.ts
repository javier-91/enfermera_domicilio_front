import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MenuComponent } from '../../../components/menu/menu.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FooterComponent, MenuComponent, HeaderComponent, AsyncPipe, NgIf, FullCalendarModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  userInfo: any;
  authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);


  /**
   * Devuelve un saludo según la hora
   */
  getSaludo(): string {
    const hora = new Date().getHours(); // Obtiene la hora actual (0-23)
    if (hora < 12) return 'Buenos días';
    if (hora < 20) return 'Buenas tardes';
    return 'Buenas noches';
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }

  /**Cargamos todas las opciones del calendario */
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',//VIstas, dayGridMonth, timeGridWeek, timeGridDay, listWeek
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2025-08-28' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
