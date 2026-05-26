import { Component } from '@angular/core';
import { Button3dComponent} from 'button3d';
import { Nav} from '../components/nav/nav';
import { SidebarComponent} from '../components/sidebar/sidebar.component';
import { SplashScreen} from '../components/splash-screen/splash-screen';

@Component({
  selector: 'app-home',
  imports: [
    Button3dComponent,
    Nav,
    SplashScreen,
  SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
  constructor() {
    this.disableScroll();
  }

  onSplashComplete() { 
    this.enableScroll();
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