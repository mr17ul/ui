import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComplaintForm } from './components/create/form.component';
import { MatSnackBarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, MatIconModule, MatDividerModule, MatListModule, MatChipsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BankService } from '../../services/cms/bank.service';
import { PrincipleService } from '../../services/cms/principle.service';
import { StateService } from '../../services/cms/state.service';
import { DistrictService } from '../../services/cms/district.service';
import { BranchService } from '../../services/cms/branch.service';
import { ComplaintCategoryService } from '../../services/cms/complaint-category.service';
import { ComplaintService } from '../../services/cms/complaint.service';
import { ComplaintListComponent } from './components/list/complaint-list.component';
import { ViewComplaintComponent } from './components/view/view-complaint.component';
import { ComplaintActionComponent } from './components/action/action.component';
import { ComplaintActionService } from '../../services/cms/complaint-action.service';
import { StatusTagComponent } from './components/status-tag/status-tag.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { UploadService } from 'src/app/services/cms/upload.service';

@NgModule({
    declarations: [ComplaintForm, ComplaintListComponent, ViewComplaintComponent, ComplaintActionComponent, StatusTagComponent, AttachmentComponent],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        HttpClientModule,
        MatSelectModule,
        BrowserModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatChipsModule
    ],
    providers: [PrincipleService, BankService, StateService, DistrictService, BranchService, ComplaintCategoryService, ComplaintService, ComplaintActionService, UploadService],
    entryComponents: [ComplaintForm, ComplaintListComponent, ViewComplaintComponent, ComplaintActionComponent, StatusTagComponent],
    exports: [ComplaintForm, ComplaintListComponent]
})
export class ComplaintModule {

}