import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { JobNewListComponent } from '../../jobnews/components/job-new-list/job-new-list.component';
import { JobNewsService } from '../../jobnews/services/jobNews.service';
import { SimpleJobNew } from '../../jobnews/interfaces';
import { JobNewListSkeletonComponent } from './ui/job-new-list-skeleton/job-new-list-skeleton.component';

@Component({
    selector: 'job-news-page',
    imports: [
        JobNewListComponent,
        JobNewListSkeletonComponent,
        RouterLink
    ],
    templateUrl: './job-news-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class JobNewsComponent {

  private jobNewsService: JobNewsService = inject(JobNewsService);
  public jobNews = signal<SimpleJobNew[]>([]);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

    public currentPage = toSignal<number>(
      this.route.params.pipe(
        map( params => params['page'] ?? '1'),
        map( page => ( isNaN( +page ) ? 1 : +page )),
        map( page => Math.max(1, page))
      )
    );

  public loadOnPageChanged = effect(() => {
    this.loadJobNews(this.currentPage());

  })

  public loadJobNews(page = 1) {  // ← La página por defecto es 1 en lugar de 0
    const pageToLoad = page;  // ← Usamos directamente "page" sin modificarlo

    this.jobNewsService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.title.setTitle(`Noticias Alerta Trabajo - Pag ${pageToLoad}`))
      )
      .subscribe((jobNews) => {
        this.jobNews.set(jobNews);
      });
  }

}
