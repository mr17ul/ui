import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'reset-password',
    styleUrls: ['reset.component.scss'],
    templateUrl: 'reset.component.html'
})

/**
 * Reset password from the email received with a reset token
 */
export class ResetPasswordComponent {

    /**
     * New password
     */
    password: string

    /**
     * Confirm new password
     */
    confirmPassword: string

    /**
     * Hidden token received in reset password email
     */
    resetToken: string
    error: string
    success: string
    form: FormGroup

    constructor(private authSvc: AuthService, private router: Router,
        private route: ActivatedRoute) {
        this.route.queryParams.subscribe(p => {
            this.resetToken = p['code']
        })
        this.form = new FormGroup({
            password: new FormControl(null, [Validators.required, Validators.maxLength(30),
            Validators.pattern(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
            confirmpassword: new FormControl(null, [Validators.required, Validators.maxLength(30)])
        })

    }

    /**
     * Resets the password with the token. On success user can login with the new password
     */
    resetPassword() {
        if (!this.form.valid) {
            console.log(this.form.get('password'))
            return
        }
        this.error = null
        this.authSvc.resetPassowrd(this.resetToken, this.password, this.confirmPassword)
            .subscribe(r => {
                this.success = 'Password has been reset. Redirecting to login...'
                setTimeout(() => this.router.navigate(['login']), 2000)
            }, e => {
                this.error = e.error.data[0].messages[0].message
            })
    }
}