import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
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
      content: 'https://alertatrabajo.com/assets/alerta-trabajo-og.jpg'
    });

    this.meta.updateTag({
      name: 'og:url',
      content: 'https://alertatrabajo.com/sobre-nosotros'
    });

    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow'
    });
  }
}
