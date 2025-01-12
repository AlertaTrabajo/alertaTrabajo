import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Article, PaginatedArticles } from '../interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);
  private baseUrl = environments.baseUrl;

  // Obtener artículos paginados (con descripciones)
  public loadPage(page: number = 1, limit: number = 6): Observable<PaginatedArticles> {
    return this.http
      .get<PaginatedArticles>(`${this.baseUrl}/articles/?page=${page}&limit=${limit}`)
      .pipe(
        map((response) => ({
          ...response,
          articles: response.articles.map((article) => ({
            ...article,
            description: this.extractDescription(article),
          })),
        }))
      );
  }

  // Obtener artículo por slug
  public getArticleBySlug(slugOrId: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${slugOrId}`).pipe(
      switchMap((article) =>
        this.incrementViews(article._id).pipe(
          map(() => article)
        )
      )
    );
  }

  // Obtener artículo con detalles completos
  public loadArticleWithDetails(slug: string): Observable<{ article: Article; description: string }> {
    return forkJoin({
      article: this.http.get<Article>(`${this.baseUrl}/articles/${slug}`),
    }).pipe(
      map(({ article }) => ({
        article,
        description: this.extractDescription(article),
      }))
    );
  }

  // Función que genera descripciones cortas para el listado
  private extractDescription(article: Article): string {
    if (article.content) {
      const firstSentence = article.content.split('. ')[0];
      return firstSentence.length > 100
        ? `${firstSentence.slice(0, 100)}...`
        : firstSentence;
    }
    return 'Descripción no disponible';
  }

  // Incrementar vistas de un artículo
  private incrementViews(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/articles/${id}/increment-views`, {});
  }
}
