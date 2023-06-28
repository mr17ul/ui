import { Component } from '@angular/core';
import { Complaint } from '../../../../models/cms.model';
import { ComplaintService } from '../../../../services/cms/complaint.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: "view-complaint",
    templateUrl: "view-complaint.component.html",
    styleUrls: ["view-complaint.component.scss"]
})
export class ViewComplaintComponent {
    complaint: Complaint
    baseUrl 
    constructor() {
        this.complaint = history.state.complaint
        this.baseUrl = environment.baseUrl
    }

}