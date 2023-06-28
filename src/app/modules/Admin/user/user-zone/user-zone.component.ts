import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRegion, State, District, Branch } from 'src/app/models/cms.model';
import { DistrictService } from 'src/app/services/cms/district.service';
import { BranchService } from 'src/app/services/cms/branch.service';
import { StateService } from 'src/app/services/cms/state.service';
import { UserRegionService } from 'src/app/services/cms/user-region.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'user-zone',
    templateUrl: 'user-zone.component.html',
    styleUrls: ['user-zone.component.scss']
})
export class UserZoneComponent {

    user: UserModel
    userRegion: UserRegion
    statesList: State[];
    districtList: District[]
    branchList: Branch[]


    constructor(private stateSvc: StateService,
        private districtSvc: DistrictService,
        private branchSvc: BranchService,
        private userRegionSvc: UserRegionService,
        private _snackBar: MatSnackBar) {
        this.user = history.state.user
        this.userRegion = new UserRegion()
        this.userRegion.user = this.user
    }

    ngAfterViewInit() {

        this.userRegionSvc.load(this.user).subscribe(r => {
            console.log(r)
            if (r != null) {
                this.userRegion = r
            }
        })

        this.stateSvc.list().subscribe(r => {
            this.statesList = r
        })

        this.districtSvc.listAll().subscribe(r => {
            this.districtList = r
        })

        this.branchSvc.listAll().subscribe(r => {
            this.branchList = r
        })

    }

    compare(s1, s2) {
        return s1.code == s2.code
    }

    compareBranch(b1, b2) {
        return b1.id == b2.id
    }

    mapUser() {
        console.log(this.userRegion)
        this.userRegionSvc.map(this.userRegion).subscribe(r => {
            this._snackBar.open("Success!", "OK", {
                duration: 2000,
            });
        }, e => {
            console.error(e)
            this._snackBar.open("Failed to map. Please try again", "OK", {
                duration: 2000,
            });
        })
    }

}
