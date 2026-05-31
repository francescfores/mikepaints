import { Component,OnInit,AfterViewInit, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { Button3dComponent} from 'button3d';
import { Nav} from '../components/nav/nav';
import { SidebarComponent} from '../components/sidebar/sidebar.component';
import { SplashScreen} from '../components/splash-screen/splash-screen';
import { Carousel} from '../components/carousel/carousel';
import { Gallery} from '../components/gallery/gallery';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [
    Button3dComponent,
    Nav,
    CommonModule,
    SplashScreen,
    Gallery,
    Carousel,
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

  mySlides = [
    {
      id: 3,
      image: '/assets/mikepaints/images/inuyabo.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
     {
      id: 3,
      image: '/assets/mikepaints/images/inuyabo-Photoroom2.png',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/jiraya-Photoroom.png',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/jiraya.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 1,
      image: '/assets/mikepaints/images/mewtwo-Photoroom.png',
      title: 'Digital Prism',
      description: 'Where geometry meets art in a stunning display of light and form.'
    },
    {
      id: 2,
      image: '/assets/mikepaints/images/mewtwo.jpeg',
      title: 'Tech Haven',
      description: 'Immerse yourself in the cutting edge of technology and innovation.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/inuyabo.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    }
  ];

  mySlides2 = [
        {
      id: 3,
      image: '/assets/mikepaints/images/minotauro-Photoroom.png',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
     {
      id: 3,
      image: '/assets/mikepaints/images/minotauro.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/orco4.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/orco.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 1,
      image: '/assets/mikepaints/images/ejercitotankes.jpeg',
      title: 'Digital Prism',
      description: 'Where geometry meets art in a stunning display of light and form.'
    },
    {
      id: 2,
      image: '/assets/mikepaints/images/marine6.jpeg',
      title: 'Tech Haven',
      description: 'Immerse yourself in the cutting edge of technology and innovation.'
    }
  ];


 mySlides3 = [
     {
      id: 3,
      image: '/assets/mikepaints/images/minotauro.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/orco4.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/orco.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 1,
      image: '/assets/mikepaints/images/ejercitotankes.jpeg',
      title: 'Digital Prism',
      description: 'Where geometry meets art in a stunning display of light and form.'
    },
    {
      id: 2,
      image: '/assets/mikepaints/images/marine6.jpeg',
      title: 'Tech Haven',
      description: 'Immerse yourself in the cutting edge of technology and innovation.'
    },

    {
      id: 3,
      image: '/assets/mikepaints/images/orco4.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 3,
      image: '/assets/mikepaints/images/orco.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 1,
      image: '/assets/mikepaints/images/ejercitotankes.jpeg',
      title: 'Digital Prism',
      description: 'Where geometry meets art in a stunning display of light and form.'
    },
     {
      id: 3,
      image: '/assets/mikepaints/images/minotauro.jpeg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    },
    {
      id: 2,
      image: '/assets/mikepaints/images/marine6.jpeg',
      title: 'Tech Haven',
      description: 'Immerse yourself in the cutting edge of technology and innovation.'
    }
  ];
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