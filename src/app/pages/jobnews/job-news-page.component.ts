import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        JobNewListSkeletonComponent
    ],
    templateUrl: './job-news-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class JobNewsComponent implements OnInit {

  private jobNewsService: JobNewsService = inject(JobNewsService);
  public jobNews = signal<SimpleJobNew[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

    public currentPage = toSignal<number>(
      this.route.queryParamMap.pipe(
        map( params => params.get('page') ?? '1'),
        map( page => ( isNaN( +page ) ? 1 : +page )),
        map( page => Math.max(1, page))
      )
    );

  ngOnInit(): void {
    this.loadJobNews();
  }

  public loadJobNews(page = 0) {
const pageToLoad = this.currentPage()! + page;

    this.jobNewsService.loadPage(pageToLoad)
    .pipe(
      tap(() =>
        this.router.navigate([], { queryParams: { page: pageToLoad } })
      ),
      tap(() => this.title.setTitle(`Noticias Alerta Trabajo - Pag ${ pageToLoad } `) )
    )
    .subscribe((jobNews) => {
      this.jobNews.set(jobNews);
    });

  }
}
