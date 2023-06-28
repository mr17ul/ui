import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
@Component({
    selector: 'forgot-password',
    styleUrls: ['forgot.component.scss'],
    templateUrl: 'forgot.component.html'
})

/**
 * Forgot password functionality
 */
export class ForgotPasswordComponent {

    /**
     * Email of the user whose password needs to be reset
     */
    email: string
    error: string
    success: string

    constructor(private authSvc: AuthService) { }

    /**
     * Sends reset password requiest to the server 
     */
    forgotPassword() {
        this.error = null
        this.authSvc.forgotPassword(this.email)
            .subscribe(r => {
                this.success = 'Please check your email to reset your password'
             }, e => {
                console.log(e)
                this.error = e.error.data[0].messages[0].message
            })
    }
}