import { Component, signal,Injectable,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ThemeService } from './services/theme/theme.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('mikepaints');

  isDarkEnable = false;
  sidebarOpen= false;

  constructor(
    public themeService: ThemeService,
    //public sidebarService: SidebarService
) {}

  ngOnInit(): void {
     this.themeService.getCurrentTheme().subscribe(theme => {
      this.isDarkEnable = theme === 'theme-dark';
    });
    //this.sidebarService.getSidebarState().subscribe(sidebarOpen => {
    //  this.sidebarOpen = sidebarOpen;
    //}); 
  }
}
