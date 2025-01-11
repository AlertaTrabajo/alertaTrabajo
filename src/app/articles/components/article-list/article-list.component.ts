import { Component, input, computed } from '@angular/core';
import { SimpleArticle } from '../../interfaces/article.interface';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'article-list',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent {
  // Recibe la señal como input
  public articles = input<SimpleArticle[]>();

  // Computed para devolver el array subyacente
  public articlesList = computed(() => this.articles() ?? []);
}
