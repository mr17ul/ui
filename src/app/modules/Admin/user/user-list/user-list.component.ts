import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { State, Bank, Branch, District, ComplaintCategory, Complaint } from '../../../../models/cms.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from '../../../../services/cms/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserModel[]
  displayedColumns: string[] = ["username", "empCode", "name", "email", "role","update","mapping"];

  isNarrowWidth = false

  dataSource = new MatTableDataSource<UserModel>(this.users)

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.dataSource.paginator = this.paginator

  }


  ngOnInit() {
    this.userService.list().subscribe(r => {
      this.users = r
    })
  }

  public viewUsers(user: UserModel) {
    this.router.navigate(['update-user'], { state: { user: user }, relativeTo: this.route.parent })
  }


  public mapZones(user: UserModel) {
    this.router.navigate(['user-zone'], { state: { user: user }, relativeTo: this.route.parent })
  }

  public addUsers() {
    this.router.navigate(['create-user'], { relativeTo: this.route.parent });

  }

}
