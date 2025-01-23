import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimpleJobNew } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'job-new-card',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './job-new-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobNewCardComponent {

  public jobNew = input.required<SimpleJobNew>();


 }
