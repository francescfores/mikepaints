// carousel.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal, computed, OnDestroy, HostListener, input } from '@angular/core';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnDestroy {

  private autoAdvanceInterval: any;
  private touchStartX = 0;
  private touchEndX = 0;
  private readonly SWIPE_THRESHOLD = 50;
  private readonly AUTO_ADVANCE_DELAY = 5000; // 5 seconds

  // State management with signals
  currentSlide = signal<number>(0);
  slides = input.required<Slide[]>(); // Obligatorio

 
  slides2= signal<Slide[]>([
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
  ]);

  // Computed values
  progressWidth = computed(() => {
    return ((this.currentSlide() + 1) / this.slides().length) * 100;
  });

  // Helper methods for template
  getNextIndex(): number {
    return (this.currentSlide() + 1) % this.slides().length;
  }

  getPrevIndex(): number {
    return (this.currentSlide() - 1 + this.slides().length) % this.slides().length;
  }

  isVisible(index: number): boolean {
    const current = this.currentSlide();
    const next = this.getNextIndex();
    const prev = this.getPrevIndex();
    return index === current || index === next || index === prev;
  }

  // Navigation methods
  nextSlide(): void {
    this.currentSlide.update(current => (current + 1) % this.slides().length);
    this.resetAutoAdvance();
  }

  prevSlide(): void {
    this.currentSlide.update(current => (current - 1 + this.slides().length) % this.slides().length);
    this.resetAutoAdvance();
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.resetAutoAdvance();
  }

  // Touch events for swipe
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > this.SWIPE_THRESHOLD) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  // Auto-advance functionality
  private resetAutoAdvance(): void {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
    this.autoAdvanceInterval = setInterval(() => {
      this.nextSlide();
    }, this.AUTO_ADVANCE_DELAY);
  }

  // Pause auto-advance on hover (optional)
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.resetAutoAdvance();
  }

  constructor() {
    this.resetAutoAdvance();
  }

  ngOnDestroy(): void {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
  }
}