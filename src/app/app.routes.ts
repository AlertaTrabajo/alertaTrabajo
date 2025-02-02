import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'news',
    redirectTo: 'news/page/1',
    pathMatch: 'full',
  },
  {
    path: 'news/page/:page',
    loadComponent: () => import('./pages/jobnews/job-news-page.component'),
  },
  {
    path: 'news/:slug',
    loadComponent: () => import('./pages/jobnew/job-new-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy-page.component'),
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
      return 'news/page/1';
    },
  },
];
