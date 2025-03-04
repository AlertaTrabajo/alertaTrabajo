import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimpleArticle } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'article-card',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './article-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {

  public article = input.required<SimpleArticle>();

 }
