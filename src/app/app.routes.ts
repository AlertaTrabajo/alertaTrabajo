import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'news/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'articles',
    loadComponent: () => import('./pages/articles/articles-page.component'),
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./pages/article/article-page.component'),
  },

  {
    path: '**',
    redirectTo: () => {
      return 'articles';
    },
  },
];
