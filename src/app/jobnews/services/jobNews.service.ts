import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { JobNew, JobNewAPIResponse, SimpleJobNew } from '../interfaces';
import { environments } from '../../../environments/environments';
import bootstrap from '../../../main.server';

@Injectable({
  providedIn: 'root',
})
export class JobNewsService {
  private http = inject(HttpClient);

  public baseUrl = environments.baseUrl;
  public loadPage(page: number): Observable<SimpleJobNew[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<JobNewAPIResponse[]>(
      `${this.baseUrl}/news?limit=10&offset=${page * 10}`
    ).pipe(
      map((resp) => {
        const simpleJobNews: SimpleJobNew[] = resp.map((jobNew) => ({
          id: jobNew._id,
          title: jobNew.title,
          subtitle: jobNew.subtitle,
          img: jobNew.imgUrl!,
          tags: jobNew.tags,
          slug: jobNew.slug
        }));
        return simpleJobNews;
      }),
      tap()
    );
  }

  public loadJobNew(slug: string): Observable<JobNew> {
    return this.http
      .get<JobNew>(`${this.baseUrl}/news/${slug}`)
      .pipe(
        tap((jobNew) => {
          this.http
            .patch(`${this.baseUrl}/news/${jobNew._id}/increment-views`, {})
            .subscribe({
              error: (err) => console.error('Error incrementando visualizaciones', err),
            });
        })
      );
  }

}
