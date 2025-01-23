import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { JobNew, JobNewAPIResponse, SimpleJobNew } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class JobNewsService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimpleJobNew[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<JobNewAPIResponse[]>(
      `https://alerta-trabajo-backend-261918624074.us-central1.run.app/news?limit=10&offset=${page * 10}`
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

  public loadJobNew(slug: string){
    return this.http.get<JobNew>(`https://alerta-trabajo-backend-261918624074.us-central1.run.app/news/${slug}`)
  }
}
