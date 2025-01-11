import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Article } from '../../articles/interfaces/article.interface';
import { ArticlesService } from '../../articles/services/articles.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { FormatTextPipe } from '../../../pipes/format-text.pipe';
import { TranslateCategoryPipe } from '../articles/pipes/translate-category.pipe';
import { SpanishDatePipe } from '../articles/pipes/spanish-date.pipe';

@Component({
  selector: 'article-page',
  standalone: true,
  imports: [
    CommonModule,
    FormatTextPipe,
    TranslateCategoryPipe,
    SpanishDatePipe
  ],
  templateUrl: './article-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlePageComponent implements OnInit {
  private articlesService = inject(ArticlesService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public article = signal<Article | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.articlesService
      .getArticleBySlug(slug)
      .pipe(
        tap((article) => {
          const pageTitle = article.title;
          const pageDescription = article.content.substring(0, 150);
          this.title.setTitle(pageTitle);

          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: article.imgUrl,
          });
        })
      )
      .subscribe(this.article.set);
  }

  shareOnTwitter() {
    const text = `Echa un vistazo a este artículo: ${this.article()?.title}`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnBluesky() {
    // Bluesky no tiene una API de compartir directa, podrías abrir la página principal
    window.open('https://bsky.app', '_blank');
  }

  shareOnWhatsApp() {
    const text = encodeURIComponent(`Echa un vistazo a este artículo: ${this.article()?.title} ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareOnTelegram() {
    const text = encodeURIComponent(`Echa un vistazo a este artículo: ${this.article()?.title} ${window.location.href}`);
    window.open(`https://t.me/share/url?url=${text}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Enlace copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar el enlace: ', err);
    });
  }
  

}
