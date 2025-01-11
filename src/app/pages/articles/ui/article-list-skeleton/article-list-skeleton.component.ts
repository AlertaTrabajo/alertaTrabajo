import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'article-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './article-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListSkeletonComponent {}
