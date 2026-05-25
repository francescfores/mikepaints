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

    const steps2 = [1, 1.6, 2]; 

    const steps =  [
      'circle(10% at 50% 50%)',
      'circle(30% at 50% 50%)',
      'circle(100% at 50% 50%)',
    ];

    let i = 0;

    const runStep = () => {

      if (i >= steps.length) return;

      const maxWave = Math.min(window.innerWidth * 0.4, 400);

      const waveSizePx = steps2[i] * maxWave;

      this.renderer.setStyle(
        el,
        'clip-path',
        steps[i]
      );

      this.renderer.setStyle(
        root,
        '--wave-size',
        `${waveSizePx}px`
      );

      this.renderer.setStyle(
        root,
        '--wave-small-size',
        `${waveSizePx * 0.9}px` 
      );

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