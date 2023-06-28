import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/components/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './modules/home/components/home.component';
import { RentListComponent } from './modules/rent-admin/rent-agreement/rent-list/rent-list.component';
import { CreateRentComponent } from './modules/rent-admin/rent-agreement/create-rent/create-rent.component';
import { DashboardComponent } from './modules/rent-admin/dashboard/dashboard.component';
import { UtrUploadComponent } from './modules/rent-admin/utr-upload/utr-upload.component';
import { MonthlyRentReportComponent } from './modules/rent-admin/reports/monthly-rent-report/monthly-rent-report.component';
import { BranchActionsComponent } from './modules/rent-admin/branch-actions/branch-actions.component';
import { BranchStatementComponent } from './modules/rent-admin/branch-statement/branch-statement.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: [{
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
        },
        {
          path: 'create-rent',
          component: CreateRentComponent
        },
        {
          path: 'list-rent',
          component: RentListComponent
        },
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'utr-upload',
          component: UtrUploadComponent
        },
        {
          path: 'monthly-rent-report',
          component: MonthlyRentReportComponent
        },
        {
          path: 'branch-actions',
          component: BranchActionsComponent
        }, {
          path: 'branch-statement',
          component: BranchStatementComponent
        }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
