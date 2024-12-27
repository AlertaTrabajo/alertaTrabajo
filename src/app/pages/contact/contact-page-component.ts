import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

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
      name: 'og:url',
      content: 'https://alertatrabajo.com/contacto'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });
  }
}
