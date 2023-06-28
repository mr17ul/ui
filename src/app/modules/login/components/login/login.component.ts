import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
    selector: 'login',
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html'
})
/**
 * Responbible for login functionality and landing page
 */
export class LoginComponent {

    /**
     * Username of the user to authenticate
     */
    username: string;

    /**
     * Password for the user
     */
    password: string;
    errorMsg: string;
    working: boolean;

    /**
     * Status of the captcha. 0 or -1 = not solved. 1 = validated
     */
    captcha: number = 0

    @ViewChild("recaptcha", { static: false }) recaptcha: RecaptchaComponent

    constructor(private auth: AuthService, private router: Router) { }

    /**
     * Perform login with the given details
     */
    public login() {

        if (this.captcha == 0 || this.captcha == -1) {
            this.errorMsg = "Please solve the captcha"
            return
        }

        this.working = true
        this.errorMsg = null
        this.auth.logout()
        this.auth.login(this.username, this.password).subscribe(res => {
            console.log('Success')
            this.router.navigate(['home'])
        }, err => {
            this.working = false
            this.errorMsg = "Incorrect username or password"
        })
    }

    /**
     * Validates the captcha with the backend api
     * @param captchaResponse response from the captcha backend (google)
     */
    resolved(captchaResponse: string) {

        this.auth.validateRecaptcha(captchaResponse).subscribe(res => {
            this.captcha = 1
        }, err => {
            console.error(err)
            this.captcha = -1
            this.errorMsg = "Failed to verify recaptch. Please try again"
            this.recaptcha.reset()
        })
    }

}