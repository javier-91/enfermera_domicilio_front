import { Component, AfterViewInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import anime from 'animejs/lib/anime.es.js'; // Importación de anime.js para la animación de las imágenes
import { isPlatformBrowser } from '@angular/common'; // Importación de isPlatformBrowser para detectar si el código se ejecuta en el navegador
import { PLATFORM_ID } from '@angular/core'; // Importación de PLATFORM_ID para acceder al entorno de ejecución
//import gsap from 'gsap';
//import { ScrollTrigger } from 'gsap/ScrollTrigger';
//gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-inici', // El selector que usará Angular para identificar este componente
  standalone: true, // Hacemos este componente independiente (sin necesidad de un módulo adicional)
  imports: [FooterComponent, HeaderComponent], // Importación de otros componentes (Footer y Header) que se usan en este componente
  templateUrl: './inici.component.html', // El archivo de plantilla HTML para este componente
  styleUrls: ['./inici.component.css'], // El archivo de estilos CSS para este componente
  changeDetection: ChangeDetectionStrategy.OnPush // Mejora el rendimiento
})
export class IniciComponent implements AfterViewInit {
  // Definición de las variables que se utilizarán para controlar el carrusel de imágenes
  @ViewChild('carousel', { static: true }) carousel: ElementRef | undefined;
  @ViewChild('boto1', { static: true }) imatge1: ElementRef | undefined;
  @ViewChild('boto2', { static: true }) imatge2: ElementRef | undefined;
  @ViewChild('boto3', { static: true }) imatge3: ElementRef | undefined;
  currentImageIndex = 0; // Índice de la imagen activa del carrusel
  imatges: HTMLElement[] = []; // Array para almacenar las imágenes del carrusel
  //isLoading=true;//Mientras carga las imagenes i carrusel muestro otra cosa.

  // Inyectamos PLATFORM_ID para detectar si estamos en el navegador o en el servidor
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }
  

  // Este método se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit(): void {
    // Verificamos si el código se está ejecutando en el navegador antes de manipular el DOM
    if (isPlatformBrowser(this.platformId)) {
      if (this.carousel?.nativeElement) {
        // Obtenemos todas las imágenes dentro del carrusel y las guardamos en imatges
        this.imatges = Array.from(this.carousel.nativeElement.querySelectorAll('img') || []);
      }
      //this.isLoading=false;//Las imagenes estan cargadas.
      // Añadimos eventos de clic para los botones de imagen. Cuando se hace clic en una imagen, se establece como activa.
      this.imatge1?.nativeElement.addEventListener('click', () => this.setActiveImage(0));
      this.imatge2?.nativeElement.addEventListener('click', () => this.setActiveImage(1));
      this.imatge3?.nativeElement.addEventListener('click', () => this.setActiveImage(2));
      this.animateCarousel();

   // Animar un div para moverlo 100px a la derecha en 1 segundo
//gsap.to('.box', { x: 100, duration: 1 });
    }
  }

  // Método que se encarga de cambiar la imagen activa del carrusel
  private setActiveImage(index: number): void {
    // Verificamos que el índice esté dentro de los límites de las imágenes
    if (index >= 0 && index < this.imatges.length) {
      // Removemos la clase 'active' de la imagen actual y se la asignamos a la imagen seleccionada
      this.imatges[this.currentImageIndex].classList.remove('active');
      this.imatges[index].classList.add('active');
      this.currentImageIndex = index; // Actualizamos el índice de la imagen activa
    } else {
      console.error('Índice fuera de los límites de las imágenes');
    }
  }

  // Método que anima el carrusel de imágenes con anime.js
  private animateCarousel(): void {
    // Verificamos que haya imágenes en el carrusel antes de animar
    if (this.imatges.length === 0) {
      console.error("No hay imágenes en el carrusel.");
      return;
    }

    // Animamos la imagen actual
    anime({
      targets: this.imatges[this.currentImageIndex], // Objetivo de la animación (la imagen actual)
      translateX: '-100%', // Mover la imagen hacia la izquierda
      duration: 3000, // Duración de la animación
      easing: 'linear', // Tipo de easing
      complete: () => { // Función que se ejecuta cuando la animación termina
        // Comprobamos que la imagen aún exista en el array antes de intentar manipularla
        if (this.imatges[this.currentImageIndex]) {
          this.imatges[this.currentImageIndex].classList.remove('active'); // Remover la clase active
        }

        // Incrementamos el índice para la siguiente imagen
        this.currentImageIndex++;

        // Si hemos llegado al final del array, volvemos al principio
        if (this.currentImageIndex >= this.imatges.length) {
          this.currentImageIndex = 0;
        }

        // Aseguramos que la siguiente imagen exista antes de asignar la clase 'active'
        if (this.imatges[this.currentImageIndex]) {
          this.imatges[this.currentImageIndex].classList.add('active'); // Añadimos la clase 'active' a la nueva imagen
          this.imatges[this.currentImageIndex].style.transform = 'translateX(100%)'; // Mover la nueva imagen fuera de la vista
        }

        // Llamamos nuevamente al método para continuar con la animación
        this.animateCarousel();
      }
    });
  }
}
