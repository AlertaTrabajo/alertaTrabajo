import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/notices/news-page-component'),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact-page-component'),
  },

  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)

      return 'noticias';
    },
  },
];
