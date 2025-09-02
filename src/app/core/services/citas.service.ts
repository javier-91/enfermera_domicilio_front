import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, BehaviorSubject, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Cita } from '../models/cita.models';


@Injectable({
    providedIn: 'root'
})
export class CitasService {

    private apiUrl = "http://localhost:8080/citas";
    private http = inject(HttpClient); // Inyectamos HttpClient moderno usando inject()
    private authService = inject(AuthService);
    private citasSubject$ = new BehaviorSubject<Cita[]>([]);
    citas$ = this.citasSubject$.asObservable();

    /**
     * Carga las citas desde el backend
     * @returns Observable<Cita[]>
     */
    loadCitas(): Observable<Cita[]> {
        return this.http.get<Cita[]>(this.apiUrl).pipe(
            tap(citas => this.citasSubject$.next(citas))
        );
    }

    /**
     * Envia datos de contacto al backend
     */
    enviarDadesContacte(dades: any): Observable<any> {
        return this.http.post(this.apiUrl + "/contacto", dades);
    }

    /**
     * Crea una nueva cita en el backend
     * @param cita La cita a crear
     * @returns Observable<Cita>
     */
    addCita(cita: Cita): Observable<Cita> {
        return this.http.post<Cita>(this.apiUrl, cita).pipe(
            tap(nueva => this.citasSubject$.next([...this.citasSubject$.value, nueva]))
        );
    }

    /** Eliminar cita */
    deleteCita(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.citasSubject$.next(this.citasSubject$.value.filter(c => c.id !== id)))
        );
    }
    /** Actualizar cita */
    updateCita(cita: Cita): Observable<Cita> {
        console.log(cita);
        return this.http.put<Cita>(`${this.apiUrl}/${cita.id}`, cita).pipe(
            tap(updated => {
                const citas = this.citasSubject$.value.map(c => c.id === updated.id ? updated : c);
                this.citasSubject$.next(citas);
            })
        );
    }

}
