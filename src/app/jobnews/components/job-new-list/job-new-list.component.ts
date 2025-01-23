import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JobNewCardComponent } from "../job-new-card/job-new-card.component";
import { SimpleJobNew } from '../../interfaces';

@Component({
    selector: 'job-new-list',
    imports: [JobNewCardComponent],
    templateUrl: './job-new-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobNewListComponent {

  public jobNews = input.required<SimpleJobNew[]>();
}
