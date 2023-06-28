import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { bindNodeCallback } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { RoleModel } from '../../../../models/role.model';
import { UserModel } from '../../../../models/user.model';
import { UserService } from '../../../../services/cms/user.service';
import { RoleService } from '../../../../services/cms/role.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  public user: UserModel;
  public selctedRole: string;
  public roles: Array<RoleModel>;

  working: boolean = true;
  frmUser: FormGroup;
  baseUrl: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private roleService: RoleService,
  ) {
    this.user = history.state.user
    this.baseUrl = environment.baseUrl
 
  }


  ngOnInit(): void {
    this.frmUser = new FormGroup({
      'fcfirstname': new FormControl(null, Validators.required),
      'fclastname': new FormControl(null, Validators.required),
      'fcusername': new FormControl(null, Validators.required),
      'fcempcode': new FormControl(null, Validators.required),
      'fcpassword': new FormControl(null, Validators.required),
      'fcconfirmpassword': new FormControl(null, Validators.required),
      'fcemail': new FormControl(null, Validators.required),
      'fcmobile': new FormControl(null, Validators.required),
      'fcrole': new FormControl(null, Validators.required),
    });

    this.selctedRole = this.user.role.id;
    this.loadRoles();
  }

  loadRoles() {

    this.roleService.list().subscribe(r => {
      this.roles = r.roles;
      this.working = false
    }, () => {
      this.working = false
    });
  }

  ngAfterViewInit() {
    this.selctedRole = this.user.role.id;
  }

  public updateUser() {

    console.log(this.user);

    if (this.frmUser.valid) {
      this.user.role = this.roles.find(x => x.id == this.selctedRole);
      this.userService.update(this.user).subscribe(() => {
        this._snackBar.open("User updated successfully !", "Ok", {
          duration: 2000,
        });
        this.router.navigate(['list-user'], { relativeTo: this.route.parent })
      }, err => {
        this._snackBar.open("Sorry, something went wrong", "Ok", {
          duration: 2000,
        });
        console.error(err)
      });
    }
  }

  public cancel() {
    this.router.navigate(['list-user'], { relativeTo: this.route.parent })
  }
}


