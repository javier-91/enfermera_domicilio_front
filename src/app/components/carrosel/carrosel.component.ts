import { Component, AfterViewInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-carrosel',
  imports: [],
  templateUrl: './carrosel.component.html',
  styleUrl: './carrosel.component.css'
})

export class CarroselComponent implements AfterViewInit {
  // Definición de las variables que se utilizarán para controlar el carrusel de imágenes
  @ViewChild('carousel', { static: true }) carousel: ElementRef | undefined;
  @ViewChild('boto1', { static: true }) imatge1: ElementRef | undefined;
  @ViewChild('boto2', { static: true }) imatge2: ElementRef | undefined;
  @ViewChild('boto3', { static: true }) imatge3: ElementRef | undefined;
  currentImageIndex = 0;
  imatges: HTMLElement[] = [];

  // Inyectamos PLATFORM_ID para detectar si estamos en el navegador o en el servidor
  constructor(@Inject(PLATFORM_ID) private platformId: object) {

  }


  // Este método se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit(): void {
    // Verificamos si el código se está ejecutando en el navegador antes de manipular el DOM
    if (isPlatformBrowser(this.platformId)) {
      if (this.carousel?.nativeElement) {
        // Obtenemos todas las imágenes dentro del carrusel y las guardamos en imatges
        this.imatges = Array.from(this.carousel.nativeElement.querySelectorAll('img') || []);
      }
      this.imatges[0].classList.add('active');
      // Añadimos eventos de clic para los botones de imagen. Cuando se hace clic en una imagen, se establece como activa.
      this.imatge1?.nativeElement.addEventListener('click', () => this.setActiveImage(0));
      this.imatge2?.nativeElement.addEventListener('click', () => this.setActiveImage(1));
      this.imatge3?.nativeElement.addEventListener('click', () => this.setActiveImage(2));
      this.animateCarousel();
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
          this.imatges[this.currentImageIndex].style.transform ='translateX(100%)'; //Ponemos la imagen fuera de la pagina.
          // Llamamos nuevamente al método para continuar con la animación
          this.animateCarousel();
        }
      }
    });
  }
}

