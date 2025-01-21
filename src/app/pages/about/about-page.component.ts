import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Sobre Alerta Trabajo - Noticias Laborales y Recursos Útiles');

    this.meta.updateTag({
      name: 'description',
      content: 'Conoce Alerta Trabajo, el portal líder en noticias laborales, licitaciones y guías para trabajadores. Mantente informado sobre derechos, convenios y asesoramiento.'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'noticias laborales, derechos trabajadores, licitaciones, convenios colectivos, asesoramiento laboral, aumento sueldo, permisos retribuidos'
    });

    this.meta.updateTag({
      name: 'og:title',
      content: 'Sobre Alerta Trabajo - Recursos y Noticias Laborales'
    });

    this.meta.updateTag({
      name: 'og:description',
      content: 'Descubre cómo Alerta Trabajo te mantiene informado sobre licitaciones, convenios y derechos laborales para mejorar tu posición como trabajador.'
    });

    this.meta.updateTag({
      name: 'og:image',
      content: 'https://alertatrabajo.com/alerta-trabajo-logo.png'
    });

    this.meta.updateTag({
      name: 'og:url',
      content: 'https://alertatrabajo.com/about'
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website'
    });

    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Alerta Trabajo'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });
  }
}
