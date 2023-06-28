import { Component, Input } from '@angular/core';
import { ComplaintAction } from 'src/app/models/cms.model';

@Component({
    selector: 'status-tag',
    templateUrl: 'status-tag.component.html',
    styleUrls: ['status-tag.component.scss']
})
export class StatusTagComponent {
    @Input()
    action: ComplaintAction

    @Input()
    noText: boolean
}