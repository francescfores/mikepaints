import {Router} from "@angular/router";
import { Component,computed,OnInit,signal,effect,AfterViewInit, ElementRef, Renderer2, ViewChild, HostListener, input} from '@angular/core';

interface ListImg {
  id: number;
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements AfterViewInit {
items = input.required<any[]>();
  columnsCount = input<number>(5);
  
  // Señal intermedia que arranca con undefined y luego se llena
  private resolvedItems = signal<any[] | undefined>(undefined);
  

  
  // Computed que espera a que resolvedItems tenga datos
  groupedItems = computed(() => {
    const items = this.resolvedItems();
    if (!items) return []; // Retorna vacío mientras no hay datos
    
    const columns = this.columnsCount();
    const result: any[][] = [];
    
    for (let i = 0; i < columns; i++) {
      result.push([]);
    }
    
    items.forEach((item, index) => {
      const columnIndex = index % columns;
      result[columnIndex].push(item);
    });
    
    return result;
  });
    section4!:HTMLElement;
  section4_div1!:HTMLElement;


    constructor(
    private el: ElementRef, private renderer: Renderer2,
    private router: Router,

  ) {
       effect(() => {
      this.resolvedItems.set(this.items());
    });
  }

  ngAfterViewInit() {
    this.section4 = this.el.nativeElement.querySelector('.section4_animation');
    this.section4_div1 = this.el.nativeElement.querySelector('.section4_animation .div1');

  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.animationDiv4()
  }

  animationDiv4() {
    const visibilityPercentage = 0; // 10% de visibilidad
    const targetDivRect = this.section4.getBoundingClientRect();
    const targetDivHeight = targetDivRect.height;
    const viewportHeight = window.innerHeight;
    const speed = 1;
  
    // Calcular la altura visible requerida
    const requiredVisibilityHeight = targetDivHeight * visibilityPercentage;
    
    // Verificar si el div está visible en el viewport
    const isVisible = targetDivRect.top < (viewportHeight - requiredVisibilityHeight) 
                      && targetDivRect.bottom > requiredVisibilityHeight;
  
    if (isVisible) {
      // Calcular la distancia visible desde la parte superior del viewport
      const distance = Math.max(0, viewportHeight - targetDivRect.top);
      // Proporción de visibilidad
      const proportionY = Math.min(1, distance / (viewportHeight - requiredVisibilityHeight)); // Limitar entre 0 y 1
  
      // Posición Y y escala basadas en la proporción de visibilidad
      const positionY = proportionY * viewportHeight * speed;
      const scaleValue = Math.max(0, 2 - proportionY ); // Escala de 2 a 0
/*       const scaleValue = Math.max(0, 2 - proportionY * 2); // Escala de 2 a 0
 */      // Aplicar el movimiento y la escala
      this.renderer.setStyle(this.section4_div1, 'transform', ` scale(${scaleValue})`);
      this.section4.classList.add('animate-fade-in')

    } else {
      this.section4.classList.remove('animate-fade-in')

      // Si no está visible, resetear la posición y la escala (si es necesario)
/*       this.renderer.setStyle(this.section4_div1, 'transform', `translateY(0px) scale(2)`);
 */    }
    
  }


}
