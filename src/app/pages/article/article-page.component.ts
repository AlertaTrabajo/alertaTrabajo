import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { Article } from '../../articles/interfaces';
import { ArticlesService } from '../../articles/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpanishDatePipe } from '../../articles/pipes/spanish-date.pipe';
import { TranslateCategoryPipe } from '../../articles/pipes/translate-category.pipe';
import { FormatTextPipe } from '../../articles/pipes/format-text.pipe';

@Component({
    selector: 'article-page',
    imports: [
        CommonModule,
        SpanishDatePipe,
        TranslateCategoryPipe,
        FormatTextPipe
    ],
    templateUrl: './article-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticlePageComponent implements OnInit {

  private articlesService = inject(ArticlesService);
  private route = inject(ActivatedRoute);
  public article = signal<Article | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.articlesService.loadArticle(slug).subscribe(this.article.set)
  }

  copyLink():void{}

  shareOnTwitter():void{}

  shareOnFacebook():void{}

  shareOnBluesky():void{}

  shareOnWhatsApp():void{}

  shareOnTelegram():void{}


}
