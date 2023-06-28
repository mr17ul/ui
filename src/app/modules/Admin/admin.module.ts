import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchCreateComponent } from './branch/branch-create/branch-create.component';
import { BranchDetailsComponent } from './branch/branch-details/branch-details.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatGridListModule, MatTableModule, MatIconModule, MatProgressBarModule, MatListModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserZoneComponent } from './user/user-zone/user-zone.component';
import { UserRegionService } from 'src/app/services/cms/user-region.service';

@NgModule({
  declarations: [BranchCreateComponent, BranchDetailsComponent, BranchListComponent, UserCreateComponent, UserUpdateComponent, UserListComponent,UserZoneComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    BrowserModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    
],
  entryComponents: [BranchCreateComponent, BranchDetailsComponent, BranchListComponent],
  exports: [BranchCreateComponent, BranchDetailsComponent, BranchListComponent],
  providers:[UserRegionService]

})
export class AdminModule { }
