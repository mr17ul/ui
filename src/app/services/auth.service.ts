import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from '../models/auth.model';
import { tap, map } from 'rxjs/operators'
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable({
    providedIn:'root'
})
export class AuthService {

    public user:UserModel

    constructor(private http: HttpClient) {
        this.user = JSON.parse(localStorage.getItem('auth_user'))
    }

    private setToken(auth: AuthModel) {
        localStorage.setItem('auth_token', auth.jwt)
        localStorage.setItem('auth_user',JSON.stringify(auth.user))
        this.user = auth.user

        const expiration = jwt_decode(auth.jwt).exp   
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem('auth_token') != null
    }

    public login(username: string, password: string): Observable<UserModel> {
        return this.http.post<AuthModel>('auth/local', { identifier: username, password: password })
            .pipe(tap(res => this.setToken(res)), map(res => res.user));
    }

    public logout() {
        localStorage.removeItem('auth_token')
        this.user = null
    }

    public forgotPassword(email: string): Observable<void> {
        console.log('forgot pwd')
        return this.http.post<void>('auth/forgot-password', { email: email })
    }

    public resetPassowrd(resetToken: string, password: string, confirmPassword: string) {
        return this.http.post<void>('auth/reset-password', {
            password: password,
            passwordConfirmation: confirmPassword,
            code: resetToken
        })
    }

    public validateRecaptcha(token: string): Observable<any> {
        return this.http.post("recaptcha", { recaptcha: token })
    }


}