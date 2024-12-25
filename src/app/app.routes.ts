import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sobre-nosotros',
    pathMatch: 'full',
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact-page-component'),
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/pricing/pricing-page-component'),
  },
  {
    path: '**',  // Rutas no definidas van aquí
    redirectTo: 'sobre-nosotros'
  },
];
