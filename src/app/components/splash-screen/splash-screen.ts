import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  imports: [],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.css',
})
export class SplashScreen implements AfterViewInit {
  @Output() animationComplete = new EventEmitter<void>();

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit(): void {

    const el: HTMLElement =
      this.elRef.nativeElement.querySelector('.fill');

    const epa: HTMLElement =
      this.elRef.nativeElement.querySelector('.splash-container');

    const epa2: HTMLElement =
      this.elRef.nativeElement.querySelector('.splash-body');

    const root = document.documentElement;

    const steps2 = [1, 2.2, 2.5]; 

    const steps =  [
      'circle(10% at 50% 50%)',
      'circle(30% at 50% 50%)',
      'circle(100% at 50% 50%)',
    ];

    let i = 0;

      const runStep = () => {
      if (i >= steps.length) return;

      const maxWave = Math.min(window.innerWidth * 0.4, 400);
      
      // IMPORTANTE: steps2[i] debería ser un valor entre 0 y 1
      // Si steps2 = [1, 3, 4], esto dará 400, 1200, 1600px (demasiado grande)
      const waveSizePx = steps2[i] * maxWave;

      // Usar setProperty directamente en lugar de renderer
      el.style.clipPath = steps[i];
      root.style.setProperty('--wave-size', `${waveSizePx}px`);
      root.style.setProperty('--wave-small-size', `${waveSizePx * 0.7}px`);

      i++;
      setTimeout(runStep, 1200);
    };
    setTimeout(runStep, 700);

    const runStep2 = () => {
      this.renderer.addClass(epa, 'grow');
      
    setTimeout(() => {
      this.animationComplete.emit();
          epa2.classList.add('hidden');

    }, 1500); // Ajusta al tiempo de tu animación   
   };
 
    setTimeout(runStep2, 3000);
  }
}