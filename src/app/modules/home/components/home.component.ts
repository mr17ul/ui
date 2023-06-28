import { Component, ViewChild, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { MatSidenav, MatDrawer } from '@angular/material';
import { Apollo } from 'apollo-angular';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    user: UserModel;
    isAdmin: boolean = false;
    isNarrowWidth = false;


    constructor(private auth: AuthService
        , private router: Router, private apollo: Apollo) {
        (<any>window).apollo = this.apollo
        this.user = auth.user;
        this.isAdmin = auth.user.role.name == "CMS_Admin";
        this.onResize()
    }

    public logout() {
        this.auth.logout()
        this.router.navigate(['login'])
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        
        if (window.innerWidth < 800) {
            console.log('narrow')
            this.isNarrowWidth = true
        } else {
            console.log('wide')
            this.isNarrowWidth = false
        }
    }

}