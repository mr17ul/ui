import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            console.log('Redirecting to login')
            this.router.navigate(['login'])
            return false
        }
        console.log('Authorised to navigate')
        return true;
    }
}