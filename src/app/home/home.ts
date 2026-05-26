import { Component,AfterViewInit } from '@angular/core';
import { Button3dComponent} from 'button3d';
import { Nav} from '../components/nav/nav';
import { SidebarComponent} from '../components/sidebar/sidebar.component';
import { SplashScreen} from '../components/splash-screen/splash-screen';
import { CommonModule } from '@angular/common';

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
export class Home {
  showSplash = false 
  constructor() {
    this.showSplash = true 
    

  }

  onSplashComplete() { 
    this.showSplash =false ;

  }

  private disableScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  }

  private enableScroll() {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
  }
}