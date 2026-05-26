import {Component, Input, OnInit, HostListener,AfterViewInit} from "@angular/core";
import {SidebarService} from"./services/sidebar.service";
import {ThemeService} from "./../../services/theme/theme.service";
import {first} from "rxjs/operators";
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: "app-sidebar-blog",
  templateUrl: "./sidebar.component.html",
  styleUrls: ['./sidebar.component.css'],
      standalone: true,
  imports: [CommonModule,RouterModule], // Importa CommonModule aquí
    providers: [SidebarService], // Registra aquí el servicio

})
export class SidebarComponent implements OnInit,AfterViewInit {
  sidebarOpen= false;
  isDarkEnable=false;
  loginOpen = false;
  @Input() transparent = false;
  dark!:boolean;
  lastScrollPosition = 0;
  audio = new Audio('assets/sounds/mixkit-mouse-click-close-1113.wav');
  audio2 = new Audio('assets/sounds/mixkit-hard-pop-click-2364.wav');

  constructor(
    public sidebarService: SidebarService,
    public themeService: ThemeService,
    private router: Router,

  ) {
    this.sidebarOpen= false;
  }
  show_nav!:boolean;
  ngAfterViewInit(){
  }


  ngOnInit() {
    this.transparent=false;
      this.show_nav = true;

    this.sidebarService.getShow().subscribe(show_nav => {
      this.show_nav = true;
    });
    this.sidebarService.getSidebarState().subscribe(sidebarOpen => {
      this.sidebarOpen = sidebarOpen;
    });
    this.themeService.getCurrentTheme().subscribe(theme => {
      this.isDarkEnable = theme === 'theme-dark';
    });
    this.dark=this.isDarkEnable

    console.log(this.isDarkEnable)

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Aquí puedes manejar el evento de navegación
        //console.log('Navegación a:', event.url);
        $('#navbar').removeClass('-translate-y-16');

      });
    this.detectScrollDirection();

  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  show_cat=false;
  showCategories(){
    this.audio2.load();
    this.audio2.play();
  }
  changeTheme() {
    this.audio.load();
    this.audio.play();
    this.isDarkEnable = !this.isDarkEnable;
    this.animationSunMoon();
    this.themeService.changeTheme(this.isDarkEnable);
  }
  animationSunMoon(){
    var scrollDistance = document.documentElement.scrollTop;
    //console.log(document.documentElement.scrollTop)
    if(!this.isDarkEnable){
    if (scrollDistance > 0) {
      $('.moon_sun').css("fill", "hsl(var(--twc-textPrimary))");
    }

      $('.moon_sun g circle').css("transform", "scale(1)");
      // $('.moon_sun').css("transform", "rotate(-20deg)");
      setTimeout(function() {
        $('.moon_sun').css("transform", "rotate(90deg)");
        $('#moon-mask-main-nav circle').attr('r', '8');
      }, 500);
      $('#moon-mask-main-nav circle').attr('cx', '25');
      $('#moon-mask-main-nav circle').attr('cy', '0');
      $('#moon-mask-main-nav circle').attr('r', '8');
      $('.moon_sun circle').css("background", "green");
      $('.moon_sun > circle').attr("r", "5");
    }else{
          if (scrollDistance > 0) {
      $('.moon_sun').css("fill", "hsl(var(--twc-textPrimary))");
    }
      $('.moon_sun g circle').css("transform", "scale(0)");
      $('.moon_sun').css("transform", "rotate(90deg)");
      $('#moon-mask-main-nav circle').attr('cx', '10');
      $('#moon-mask-main-nav circle').attr('cy', '2');
      $('#moon-mask-main-nav circle').attr('r', '7');
      $('.moon_sun > circle').attr("r", "8");
      $('.moon_sun').css("transform", "rotate(100deg)");
      setTimeout(function() {
        $('.moon_sun').css("transform", "rotate(50deg)");
      }, 500);
    }
  }

  setLoginOpen() {
    this.loginOpen = !this.loginOpen;
  }

  logOut(){
    // this.authenticationService.logout();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    //if(!this.sidebarOpen){
      this.detectScrollDirection();
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition === 0) {
      $('#navbar').addClass('transparent');
    //} else {
  //    $('#navbar').addClass('transparent');
  //  }
    }

  }

  scroll = (): void => {

  }

  scrollDistance=0;
  detectScrollDirection() {
    var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var scrollDistance = document.documentElement.scrollTop;
    //console.log(document.documentElement.scrollTop)
    this.scrollDistance=scrollDistance;
    if (scrollDistance === 0) {
      $('.moon_sun').css("fill", "#fff");
      $('.logo').css("fill", "#fff");
      //$('#navbar').addClass('bg-transparent');
      $('#navbar').addClass('text-white');
      $('#logo').addClass('fill-white');
    }else{
      $('.moon_sun').css("fill", "hsl(var(--twc-textPrimary))");
      $('#navbar').removeClass('bg-transparent');
      $('#navbar').removeClass('text-white');
      $('#logo').removeClass('fill-white');
      $('.logo').css("fill", "hsl(var(--twc-textPrimary))");

    }
    if (currentScrollPosition > this.lastScrollPosition && scrollDistance > 0) {
      $('#navbar').addClass('-translate-y-16');
    }
    if (currentScrollPosition < this.lastScrollPosition && scrollDistance > 0) {
      // Scroll hacia arriba
      $('#navbar').removeClass('-translate-y-16');
    }
    this.lastScrollPosition = currentScrollPosition;
  }

  closeSidebarAndScroll2(anchor:any) {
  this.sidebarOpen = false;
  setTimeout(() => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.toggleSidebar();
    }
  }, 0);  // Asegúrate de que la navegación se ejecute después de cerrar la sidebar
}


  openMenu: string | null = null;

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  closeSidebarAndScroll(id: string) {
    this.openMenu = null;

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
