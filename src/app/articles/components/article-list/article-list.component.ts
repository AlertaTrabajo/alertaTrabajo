import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ArticleCardComponent } from "../article-card/article-card.component";
import { SimpleArticle } from '../../interfaces';

@Component({
    selector: 'article-list',
    imports: [ArticleCardComponent],
    templateUrl: './article-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {

  public articles = input.required<SimpleArticle[]>();
}
