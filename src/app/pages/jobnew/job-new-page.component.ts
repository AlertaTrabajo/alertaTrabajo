import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { tap } from 'rxjs';
import { JobNewsService } from '../../jobnews/services/jobNews.service';
import { JobNew } from '../../jobnews/interfaces';
import { SpanishDatePipe } from '../../jobnews/pipes/spanish-date.pipe';
import { FormatTextPipe } from '../../jobnews/pipes/format-text.pipe';
import { TranslateCategoryPipe } from '../../jobnews/pipes/translate-category.pipe';

@Component({
  selector: 'job-new-page',
  imports: [
    CommonModule,
    SpanishDatePipe,
    TranslateCategoryPipe,
    FormatTextPipe
  ],
  templateUrl: './job-new-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class JobNewPageComponent implements OnInit {

  private jobNewsService = inject(JobNewsService);
  private route = inject(ActivatedRoute);
  public jobNew = signal<JobNew | null>(null);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.jobNewsService.loadJobNew(slug)
      .pipe(
        tap((jobNew: JobNew) => {
          const pageTitle = jobNew.title;
          const pageDescription = jobNew.content.substring(0, 160) + '...';

          this.title.setTitle(pageTitle);

          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ property: 'og:title', content: pageTitle });
          this.meta.updateTag({ property: 'og:description', content: pageDescription });
          this.meta.updateTag({ property: 'og:image', content: jobNew.imgUrl });
          this.meta.updateTag({ property: 'og:url', content: `https://alertatrabajo.com/news/${jobNew.slug}` });
          this.meta.updateTag({ property: 'og:type', content: 'job-new' });

          this.meta.updateTag({ name: 'job-new:published_time', content: new Date(jobNew.date).toISOString() });
          this.meta.updateTag({ name: 'job-new:section', content: jobNew.category });

          if (jobNew.tags && jobNew.tags.length > 0) {
            this.meta.updateTag({ name: 'keywords', content: jobNew.tags.join(', ') });
          }
        })
      )
      .subscribe(this.jobNew.set);
  }

  copyLink(): void {
    const slug = this.jobNew()?.slug;
    if (!slug) {
      console.error('No se puede copiar el enlace porque no se encontró el slug.');
      return;
    }

    const url = `https://alertatrabajo.com/news/${slug}`;

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
    const slug = this.jobNew()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/news/${slug}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterUrl, '_blank');
  }

  shareOnFacebook(): void {
    const slug = this.jobNew()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/news/${slug}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank');
  }

  shareOnBluesky(): void {
    const slug = this.jobNew()?.slug;
    if (!slug) {
      alert('No se encontró el enlace para compartir.');
      return;
    }

    const url = `https://alertatrabajo.com/news/${slug}`;

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
    const slug = this.jobNew()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/news/${slug}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnTelegram(): void {
    const slug = this.jobNew()?.slug;
    if (!slug) return;

    const url = `https://alertatrabajo.com/news/${slug}`;
    const telegramUrl = `https://t.me/share/url?url=${url}`;
    window.open(telegramUrl, '_blank');
  }

}
