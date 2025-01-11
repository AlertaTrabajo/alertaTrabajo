import { Component, computed, input } from '@angular/core';
import { SimpleArticle } from '../../interfaces/article.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatTextPipe } from '../../../../pipes/format-text.pipe';
import { FormatTextListPipe } from '../../../../pipes/formate-text-list.pipe';

@Component({
  selector: 'article-card',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormatTextListPipe
  ],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  public article = input.required<SimpleArticle>();

  // Imagen destacada del artículo
  public readonly articleImage = computed(() =>
    this.article().imgUrl || 'https://via.placeholder.com/400'
  );
}
