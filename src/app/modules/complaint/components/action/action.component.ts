import { Component, Input } from '@angular/core';
import { ComplaintActionService } from '../../../../services/cms/complaint-action.service';
import { Complaint, ComplaintAction } from 'src/app/models/cms.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'complaint-action',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.scss']
})
export class ComplaintActionComponent {

    @Input() complaint: Complaint
    complaintAction: ComplaintAction

    constructor(private complaintActionService: ComplaintActionService,
        private auth: AuthService) {
        this.complaintAction = new ComplaintAction()

    }

    public forward() {
        this.complaintAction.actionTaken = "forwarded"
        this.create()
    }

    public resolve() {
        this.complaintAction.actionTaken = "resolved"
        this.create()
    }

    private create() {
        this.complaintAction.created_at = new Date()
        this.complaintAction.complaint = this.complaint
        this.complaintActionService.create(this.complaintAction).subscribe(() => {
            this.complaint.complaintActions.splice(0, 0, this.complaintAction)
        }, err => {
            // TODO Show error msg
            console.error(err)
        })
    }

    showCreateAction() {
        if (this.complaint.complaintActions) {
            if (this.auth.user.role.type == "branch_manager") {
                return this.complaint.complaintActions.length == 0
            } else if (this.auth.user.role.type == "grievance officer") {
                if (this.complaint.complaintActions.length == 0) {
                    return false
                }
                return this.complaint.complaintActions[0].actionTaken != "resolved"
            }
        }
        return false
    }



}