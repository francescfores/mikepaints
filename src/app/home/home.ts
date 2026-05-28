import { Component,OnInit,AfterViewInit, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { Button3dComponent} from 'button3d';
import { Nav} from '../components/nav/nav';
import { SidebarComponent} from '../components/sidebar/sidebar.component';
import { SplashScreen} from '../components/splash-screen/splash-screen';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [
    Button3dComponent,
    Nav,
    CommonModule,
    SplashScreen,
  SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  showSplash = false 

  section2!:HTMLElement;
  section2_div!:HTMLElement;
  section2_div2!:HTMLElement;
  section2_div3!:HTMLElement;
  circle2! : HTMLElement;

  constructor(
    private el: ElementRef, private renderer: Renderer2,
    private router: Router,

  ) {
    this.showSplash = true 


  //this.enableScroll();
   //     this.showSplash =false ;
  }

  ngAfterViewInit() {
    this.section2 = this.el.nativeElement.querySelector('.section2_animation');
    this.section2_div = this.el.nativeElement.querySelector('.section2_animation .div1');
    this.section2_div2 = this.el.nativeElement.querySelector('.section2_animation .div2');
    this.section2_div3 = this.el.nativeElement.querySelector('.section2_animation .div3');
    this.circle2 = this.el.nativeElement.querySelector('.section3 .circle2');
    //this.enableScroll();
        //this.showSplash =false ;

  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    this.animationDiv2()
  }

  animationDiv2() {
    const visibilityPercentage = -0.1; // 50% de visibilidad
    const targetDivRect = this.section2.getBoundingClientRect();
    const targetDivHeight = targetDivRect.height;
    const targetDivWidth = targetDivRect.width; // Añadimos la anchura del targetDiv
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const circleHeight = this.circle2.offsetHeight; // Cambiar a offsetHeight para el círculo
    const speed = -0.10;
  
    // Calcular la altura visible requerida
    const requiredVisibilityHeight = targetDivHeight * visibilityPercentage;
    // Verificar visibilidad del targetDiv (dentro del viewport)
    const isVisible = targetDivRect.top < (viewportHeight - requiredVisibilityHeight) 
    && targetDivRect.bottom > requiredVisibilityHeight;
    if (isVisible) {
      // Calcular la distancia visible
      const distance = Math.max(0, viewportHeight - targetDivRect.top - requiredVisibilityHeight);
      // Calcular la proporción visible en el eje vertical
      const proportionY = distance / (viewportHeight - requiredVisibilityHeight);
      // Calcular la posición Y proporcional al ancho del targetDiv
      const positionY = proportionY * (viewportHeight - circleHeight) * speed;
      // Aplicar el movimiento en el eje Y
/*       this.renderer.setStyle(this.section2, 'transform', `translateY(${positionY}px)`);
 */      this.renderer.setStyle(this.section2_div, 'transform', `translateY(${positionY*0.8}px)`);
      this.renderer.setStyle(this.section2_div2, 'transform', `translateY(${(positionY*0.1)}px)`);
      this.renderer.setStyle(this.section2_div3, 'transform', `translateY(${positionY*0.8}px)`);
      this.section2.classList.add('animate-fade-in-up')

    } else {
      this.section2.classList.remove('animate-fade-in-up')
      // Mover el círculo fuera del viewport si no es visible
    }
  }
  onSplashComplete() { 
    this.showSplash =false ;

  }

  private disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableScroll() {
    document.body.style.overflow = 'auto';
  }
}