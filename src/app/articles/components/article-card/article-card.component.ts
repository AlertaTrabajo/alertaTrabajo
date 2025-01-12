import { Component, computed, input, OnInit } from '@angular/core';
import { SimpleArticle } from '../../interfaces/article.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatTextListPipe } from '../../../../pipes/formate-text-list.pipe';

@Component({
  selector: 'article-card',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormatTextListPipe,
  ],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent implements OnInit {
  public article = input.required<SimpleArticle>();

  public readonly articleImage = computed(() =>
    this.article().imgUrl || 'https://via.placeholder.com/400'
  );

  ngOnInit(): void {
    this.article().tags = this.article().tags?.map(tag =>
      tag.replace(/[@$]/g, '')
    ) ?? [];
  }

}
