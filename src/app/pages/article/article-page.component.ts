import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { Article } from '../../articles/interfaces';
import { ArticlesService } from '../../articles/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpanishDatePipe } from '../../articles/pipes/spanish-date.pipe';
import { TranslateCategoryPipe } from '../../articles/pipes/translate-category.pipe';
import { FormatTextPipe } from '../../articles/pipes/format-text.pipe';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

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
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.articlesService.loadArticle(slug)
      .pipe(
        tap((article: Article) => {
          const pageTitle = article.title;
          const pageDescription = article.content.substring(0, 160) + '...';

          this.title.setTitle(pageTitle);

          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ property: 'og:title', content: pageTitle });
          this.meta.updateTag({ property: 'og:description', content: pageDescription });
          this.meta.updateTag({ property: 'og:image', content: article.imgUrl });
          this.meta.updateTag({ property: 'og:url', content: `https://alertatrabajo.com/articles/${article.slug}` });
          this.meta.updateTag({ property: 'og:type', content: 'article' });

          this.meta.updateTag({ name: 'article:published_time', content: new Date(article.date).toISOString() });
          this.meta.updateTag({ name: 'article:section', content: article.category });

          if (article.tags && article.tags.length > 0) {
            this.meta.updateTag({ name: 'keywords', content: article.tags.join(', ') });
          }
        })
      )
      .subscribe(this.article.set);
  }

  copyLink(): void {
    const slug = this.article()?.slug;
    if (!slug) {
      console.error('No se puede copiar el enlace porque no se encontró el slug.');
      return;
    }

    const url = `https://alertatrabajo.com/articles/${slug}`;

    navigator.clipboard.writeText(url)
      .then(() => {
        alert('¡Enlace copiado al portapapeles!');
      })
      .catch((err) => {
        console.error('Error al copiar el enlace:', err);
        alert('Hubo un error al copiar el enlace. Por favor, inténtalo de nuevo.');
      });
  }

  shareOnTwitter(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/articles/${slug}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterUrl, '_blank');
  }

  shareOnFacebook(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/articles/${slug}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank');
  }

  shareOnBluesky(): void {
    const slug = this.article()?.slug;
    if (!slug) {
      alert('No se encontró el enlace para compartir.');
      return;
    }

    const url = `https://alertatrabajo.com/articles/${slug}`;

    // Copiar el enlace al portapapeles
    navigator.clipboard.writeText(url)
      .then(() => {
        // Abrir Bluesky en una nueva pestaña
        window.open('https://bsky.app', '_blank');
        // Notificar al usuario
        alert('¡El enlace ha sido copiado al portapapeles! Pégalo en tu publicación de Bluesky.');
      })
      .catch((err) => {
        console.error('Error al copiar el enlace:', err);
        alert('No se pudo copiar el enlace al portapapeles. Por favor, copia el siguiente enlace manualmente:\n' + url);
      });
  }



  shareOnWhatsApp(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/articles/${slug}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnTelegram(): void {
    const slug = this.article()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/articles/${slug}`;
    const telegramUrl = `https://t.me/share/url?url=${url}`;
    window.open(telegramUrl, '_blank');
  }

}
