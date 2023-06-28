import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './components/forgotpassword/forgot.component';
import { ResetPasswordComponent } from './components/resetpassword/reset.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatGridListModule, MatIconModule, MatProgressBarModule, MatToolbarModule, MatDialogModule } from '@angular/material';

@NgModule({
    declarations: [LoginComponent,ForgotPasswordComponent,ResetPasswordComponent],
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        HttpClientModule,
        MatSelectModule,
        BrowserModule,
        MatGridListModule,
        MatIconModule,
        MatProgressBarModule,
        MatToolbarModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MatDialogModule
    ],
    providers: [
    {
        provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Lfjb9gZAAAAALQxBpHdsF6h3VlNgWgDFnBdMf59' } as RecaptchaSettings,
    }],
    exports: [LoginComponent],
    entryComponents:[LoginComponent]
})
export class LoginModule {

}