import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'job-new-list-skeleton',
    imports: [CommonModule],
    templateUrl: './job-new-list-skeleton.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobNewListSkeletonComponent { }
