import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrivacyPolicyPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const pageTitle = 'Política de Privacidad | Alerta Trabajo';
    const description = 'Política de Privacidad de Alerta Trabajo. Conoce cómo protegemos tus datos personales y tus derechos.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'og:url', content: 'https://alertatrabajo.com/privacy-policy' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }
}
