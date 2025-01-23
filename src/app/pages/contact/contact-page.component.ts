import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  socials = [
    { name: 'X', icon: '/icons/x.svg', url: 'https://x.com/Alerta_Trabajo' },
    { name: 'Bluesky', icon: '/icons/bluesky.svg', url: 'https://bsky.app/profile/alertatrabajo.bsky.social' },
    { name: 'Facebook', icon: '/icons/facebook.svg', url: 'https://www.facebook.com/people/Alerta-Trabajo-Noticias/61570940470146/' },
    { name: 'Telegram', icon: '/icons/telegram.svg', url: 'https://t.me/+U4zCF8BSqtAzMTA0' },
  ];

  ngOnInit(): void {
    this.title.setTitle('Contacto | Alerta Trabajo - Asesoramiento Laboral');

    this.meta.updateTag({
      name: 'description',
      content: 'Contacta con Alerta Trabajo para asesoramiento laboral, dudas sobre despidos, contratos y licitaciones. Recibe atención rápida por correo o redes sociales.'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'contacto laboral, asesoramiento despidos, consultas licitaciones, ayuda contratos, Alerta Trabajo contacto'
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'Contacto | Alerta Trabajo - Asesoramiento y Consultas'
    });

    this.meta.updateTag({
      name: 'og:description',
      content: 'Ponte en contacto con Alerta Trabajo y recibe asistencia personalizada en derechos laborales, contratos y despidos. Estamos en Twitter y Facebook.'
    });

    this.meta.updateTag({
      name: 'og:image',
      content: 'https://alertatrabajo.com/alerta-trabajo-logo.png'
    });

    this.meta.updateTag({
      name: 'og:url',
      content: 'https://alertatrabajo.com/contact'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });
  }
}
