import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimpleArticle } from '../../interfaces';
import { TranslateCategoryPipe } from '../../pipes/translate-category.pipe';
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


  // logEffect = effect(()=> {
  //   console.log('articleCard: ' , this.article());
  // })
 }
