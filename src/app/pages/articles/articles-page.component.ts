import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ArticleListComponent } from '../../articles/components/article-list/article-list.component';
import { ArticleListSkeletonComponent } from "./ui/article-list-skeleton/article-list-skeleton.component";
import { ArticlesService } from '../../articles/services/articles.service';
import { SimpleArticle } from '../../articles/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'articles-page',
  standalone: true,
  imports: [
    ArticleListComponent,
    ArticleListSkeletonComponent
  ],
  templateUrl: './articles-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesComponent implements OnInit {

  private articlesService: ArticlesService = inject(ArticlesService);
  public articles = signal<SimpleArticle[]>([]);

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
    this.loadArticles();
  }

  public loadArticles(page = 0) {
const pageToLoad = this.currentPage()! + page;

    this.articlesService.loadPage(pageToLoad)
    .pipe(
      tap(() =>
        this.router.navigate([], { queryParams: { page: pageToLoad } })
      ),
      tap(() => this.title.setTitle(`Artículos Alerta Trabajo - Pag ${ pageToLoad } `) )
    )
    .subscribe((articles) => {
      this.articles.set(articles);
    });

  }
}
