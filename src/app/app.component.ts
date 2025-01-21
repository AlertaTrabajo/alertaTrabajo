import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { 'data-app-root-component': 'true' }, // Atributo único para resolver colisiones
})
export class AppComponent implements OnInit {
  title = 'Alerta-Trabajo';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
    }
  }
}
