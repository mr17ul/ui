import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    HttpClient, HttpResponse, HttpRequest,
    HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import { BankService } from '../../../../services/cms/bank.service'
import { PrincipleService } from '../../../../services/cms/principle.service'
import { BranchService } from '../../../../services/cms/branch.service';
import { StateService } from '../../../../services/cms/state.service';
import { DistrictService } from '../../../../services/cms/district.service';
import { ComplaintCategoryService } from '../../../../services/cms/complaint-category.service';
import { State, Bank, Principle, Branch, District, ComplaintCategory, Complaint } from '../../../../models/cms.model';
import { ComplaintService } from '../../../../services/cms/complaint.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { catchError, last, map, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AttachmentComponent } from '../attachment/attachment.component';

@Component({
    selector: 'complaint-form',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.scss']
})

export class ComplaintForm implements OnInit {
    @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
    @ViewChild("attachments", { static: false }) attachmentComp: AttachmentComponent;

    files = [];
    complaint: Complaint

    working: boolean
    cmplntForm: FormGroup;
    banks: Array<Bank>;
    complaintsCategories: Array<ComplaintCategory>;
    districts: District[];
    branches: Branch[];
    states: State[];
    error: string;
    user: UserModel;
    userId: string = "1";
    uploadResponse = { status: '', message: '', filePath: '' };

    constructor(private router: Router,
        private _snackBar: MatSnackBar,
        private branchService: BranchService,
        private bankService: BankService,
        private stateService: StateService,
        private districtService: DistrictService,
        private complaintCatService: ComplaintCategoryService,
        private auth: AuthService,
        private complaintService: ComplaintService) {
        this.user = auth.user;
        this.userId = this.user.username;

        this.complaint = new Complaint()
        this.complaint.branch = new Branch()
        this.complaint.branch.district = new District()

    }
    ngOnInit(): void {

        this.cmplntForm = new FormGroup({
            'attachments': new FormControl(null, []),
            'fcbank': new FormControl(null, Validators.required),
            'fcstate': new FormControl(null, Validators.required),
            'fcdistrict': new FormControl(null, Validators.required),
            'fcbranch': new FormControl(null, Validators.required),
            'fcmemberName': new FormControl(null,[Validators.required, Validators.maxLength(60)]), 
            'fcmemberId': new FormControl(null, [Validators.required, Validators.maxLength(10)]), 
            'fcgroupName': new FormControl(null, [Validators.required, Validators.maxLength(40)]), 
            'fcgroupId': new FormControl(null, [Validators.required, Validators.maxLength(10)]), 
            'fcComplaintCategory': new FormControl(null, Validators.required),
            'fcdetails': new FormControl(null,[Validators.required, Validators.maxLength(300)]), 
            'fcmobile': new FormControl('', [
                Validators.required, Validators.maxLength(10), Validators.pattern(("[6-9]\\d{9}"))
            ]),
            'fcemail': new FormControl(null, Validators.email),
        });
    }

    onStateChange() {
        this.districtService.list(this.complaint.branch.district.state.code).subscribe(r => {
            this.districts = r
            this.districts.forEach(d => d.state = this.complaint.branch.district.state)
        })
    }

    onDistrictChange() {
        this.branchService.list(this.complaint.branch.district.code).subscribe(r => {
            this.branches = r
            this.branches.forEach(b => b.district = this.complaint.branch.district)
        })
    }

    onBankChange() {
        this.districts = null
        this.branches = null
        this.complaint.branch.district.state = null
    }


    ngAfterViewInit() {

        setTimeout(() => this.working = true);
        this.bankService.list().subscribe(r => {
            this.banks = r
        });

        this.stateService.list().subscribe(r => {
            this.states = r
            this.working = false
        }, () => {
            this.working = false
        });

        this.complaintCatService.list().subscribe(r => {
            this.complaintsCategories = r
        });

    }



    public createComplaint() {

        if (this.attachmentComp.isUploadPending()) {
            this._snackBar.open("Please wait...files are being uploaded", "OK", {
                duration: 2000,
            });
            return
        }

        this.complaint.complaintActions = []
        this.complaint.attachments = this.attachmentComp.getUploadedRefs()

        if (this.complaint.bank.name == "") {
            this._snackBar.open("Select bank", "OK", {
                duration: 2000,
            });
        }
        console.log(this.complaint);

        if (this.cmplntForm.valid) {
            this.complaintService.create(this.complaint).subscribe(() => {
                console.log("Created");
                this._snackBar.open("Complaint Registered successfully!", "OK", {
                    duration: 2000,
                });
                this.router.navigate(['home'])
            }, err => {
                this._snackBar.open("Sorry, something went wrong", "OK", {
                    duration: 2000,
                });
                console.error(err)
            });
        }
    }
}