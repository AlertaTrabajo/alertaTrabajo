import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'page-news',
  standalone: true,
  imports: [],
  templateUrl: './news-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewsPageComponent implements OnInit {

  private title = inject(Title)
private meta = inject(Meta)
private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    //  if(!isPlatformServer(this.platform)){

    //   document.title = 'Pricing Page'
    //  }

      this.title.setTitle('News Page');
      this.meta.updateTag({ name: 'description', content: 'Noticias laborales'});
      this.meta.updateTag({ name: 'og:title', content: 'Noticias trabajo'});
      this.meta.updateTag({ name: 'keywords', content: 'noticias trabajo empleo sueldo despidos'});

     }

 }
