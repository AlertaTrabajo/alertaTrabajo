import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/about/about-page.component'),
  },

  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'articulos',
    loadComponent: () => import('./pages/articles/articles-page.component'),
  },
  {
    path: 'articulos/:slug',
    loadComponent: () => import('./pages/article/article-page.component'),
  },

  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)

      return 'articulos';
    },
  },
];
