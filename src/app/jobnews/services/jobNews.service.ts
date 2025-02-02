import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { JobNew, JobNewAPIResponse, SimpleJobNew } from '../interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class JobNewsService {
  private http = inject(HttpClient);

  public baseUrl = environments.baseUrl;
  public loadPage(page: number): Observable<SimpleJobNew[]> {
    // Asegurar que page nunca sea menor a 1
    const validPage = Math.max(1, page);
    const offset = (validPage - 1) * 6; // Cálculo correcto del offset
    return this.http.get<JobNewAPIResponse[]>(
      `${this.baseUrl}/news?limit=6&offset=${offset}`
    ).pipe(
      map((resp) => {
        return resp.map((jobNew) => ({
          id: jobNew._id,
          title: jobNew.title,
          subtitle: jobNew.subtitle,
          img: jobNew.imgUrl!,
          tags: jobNew.tags,
          slug: jobNew.slug
        }));
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
