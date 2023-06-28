import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective,  NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { bindNodeCallback } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RoleModel } from '../../../../models/role.model';
import { UserModel } from '../../../../models/user.model';
import { UserService } from '../../../../services/cms/user.service';
import { RoleService } from '../../../../services/cms/role.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: UserModel;
  selctedRole: RoleModel;
  roles: Array<RoleModel>;

  working: boolean = true
  frmUser: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private roleService: RoleService,
  ) {
    this.user = new UserModel()
    this.user.role = new RoleModel()
  }



  ngOnInit(): void {
    this.frmUser = new FormGroup({
      'fcfirstname': new FormControl(null, [Validators.required, Validators.maxLength(40)]), 
      'fclastname': new FormControl(null,  [Validators.required, Validators.maxLength(40)]), 
      'fcusername': new FormControl(null,  [Validators.required, Validators.maxLength(80)]), 
      'fcempcode': new FormControl(null,  [Validators.required, Validators.maxLength(15)]), 
      'fcpassword': new FormControl(null,  [Validators.required, Validators.maxLength(30)]), 
      'fcconfirmpassword': new FormControl(null,  [Validators.required, Validators.maxLength(30)]), 
      'fcemail': new FormControl(null,  [Validators.required, Validators.email, Validators.maxLength(50)]), 
      'fcmobile': new FormControl('', [
        Validators.required, Validators.pattern(("[6-9]\\d{9}"))
    ]),
      'fcrole': new FormControl(null, Validators.required),
    },this.passwordMatchValidator);
    this.working = true;

  }

   passwordMatchValidator(g: FormGroup) {
       let password = g.get('fcpassword').value;
       if(g.get('fcconfirmpassword').touched || g.get('fcconfirmpassword').dirty) {
           let verifyPassword = g.get('fcconfirmpassword').value;

           if(password != verifyPassword) {
            g.get('fcconfirmpassword').setErrors( {MatchPassword: true} )
           } else {
               return null
           }
       }
 }
  ngAfterViewInit() {

    this.roleService.list().subscribe(r => {
      this.roles = r.roles;
      this.working = false
    }, () => {
      this.working = false
    });
  }


  public createUser() {
    console.log(this.user);
    if (this.frmUser.valid) {
      this.userService.create(this.user).subscribe(() => {
        console.log("Created");
        this._snackBar.open("User Created successfully !", "Ok", {
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
