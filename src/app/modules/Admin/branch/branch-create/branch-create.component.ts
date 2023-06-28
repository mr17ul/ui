import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BranchService } from '../../../../services/cms/branch.service';
import { StateService } from '../../../../services/cms/state.service';
import { DistrictService } from '../../../../services/cms/district.service';
import { State, Branch, District, } from '../../../../models/cms.model';
import { bindNodeCallback } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'branch-create',
  templateUrl: 'branch-create.component.html',
  styleUrls: ['branch-create.component.scss']
})

export class BranchCreateComponent implements OnInit {

  selectedState: State
  branch: Branch
  states: Array<State>
  districts: Array<District>

  working: boolean
  frmBranch: FormGroup;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private branchService: BranchService,
    private stateService: StateService,
    private districtService: DistrictService,
  ) {

    this.branch = new Branch()
    this.branch.district = new District()
  }

  ngOnInit(): void {
    this.frmBranch = new FormGroup({
      'fcbranchname': new FormControl(null, Validators.required),
      'fcstate': new FormControl(null, Validators.required),
      'fcdistrict': new FormControl(null, Validators.required),
      'fcDesc': new FormControl(null, Validators.required),
    });

    this.loadUIData();
  }

  onStateChange() {
    this.districtService.list(this.selectedState.code).subscribe(r => {
      this.districts = r
      this.branch.district = null
    })
  }

  onDistrictChange() {
    this.branch.district.state = this.selectedState
  }

  public loadUIData() {
    this.working = true;

    this.stateService.list().subscribe(r => {
      this.states = r
      this.working = false
    }, () => {
      this.working = false
    });

  }


  public createBranch() {
    console.log(this.branch);
    if (this.frmBranch.valid) {
      this.branchService.create(this.branch).subscribe(() => {
        console.log("Created");
        this._snackBar.open("Branch Created successfully !", "Ok", {
          duration: 2000,
        });
        this.router.navigate(['home'])
      }, err => {
        this._snackBar.open("Sorry, something went wrong", "Ok", {
          duration: 2000,
        });
        console.error(err)
      });
    }
  }

  public cancel() {
    this.router.navigate(['home'])
  }
}
