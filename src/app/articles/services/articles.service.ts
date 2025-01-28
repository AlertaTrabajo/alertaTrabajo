import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Article, ArticleApiResponse, SimpleArticle } from '../interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);
    public baseUrl = environments.baseUrl;


  public loadPage(page: number): Observable<SimpleArticle[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<ArticleApiResponse[]>(
      `${this.baseUrl}/articles?limit=10&offset=${page * 10}`
    ).pipe(
      map((resp) => {
        const simpleArticles: SimpleArticle[] = resp.map((article) => ({
          id: article._id,
          title: article.title,
          img: article.imgUrl,
          tags: article.tags,
          slug: article.slug
        }));
        return simpleArticles;
      }),
      tap()
    );
  }

  public loadArticle(slug: string): Observable<Article> {
    return this.http
      .get<Article>(`${this.baseUrl}/articles/${slug}`)
      .pipe(
        tap((article) => {
          // Realizamos el PATCH para incrementar las visualizaciones
          this.http
            .patch(`${this.baseUrl}/articles/${article._id}/increment-views`, {})
            .subscribe({
              error: (err) => console.error('Error incrementando visualizaciones del artículo', err),
            });
        })
      );
  }

}
