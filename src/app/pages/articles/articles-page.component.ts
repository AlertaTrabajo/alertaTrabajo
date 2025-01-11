import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SimpleArticle } from '../../articles/interfaces';
import { ArticlesService } from '../../articles/services/articles.service';
import { ArticleListSkeletonComponent } from './ui/article-list-skeleton/article-list-skeleton.component';
import { ArticleListComponent } from '../../articles/components/article-list/article-list.component';



@Component({
  selector: 'articles-page',
  standalone: true,
  imports: [ArticleListComponent, ArticleListSkeletonComponent],
  templateUrl: './articles-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesPageComponent implements OnInit {
  private articlesService = inject(ArticlesService);
  public articles = signal<SimpleArticle[]>([]);  // Usamos SimpleArticle[]

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    this.loadArticles();
  }

  public loadArticles(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.articlesService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() =>
          this.title.setTitle(`Alerta Trabajo - Página ${pageToLoad}`)
        )
      )
      .subscribe((response) => {
        this.articles.set(response.articles);  // Accede al array dentro del objeto
      });
  }

}
