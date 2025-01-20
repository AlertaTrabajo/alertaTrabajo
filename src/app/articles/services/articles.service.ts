import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Article, ArticleApiResponse, SimpleArticle } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimpleArticle[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<ArticleApiResponse[]>(
      `http://localhost:3000/articles?limit=10&offset=${page * 10}`
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

  public loadArticle(slug: string){
    return this.http.get<Article>(`http://localhost:3000/articles/${slug}`)
  }
}
