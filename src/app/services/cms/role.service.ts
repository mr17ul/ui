import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleModel } from 'src/app/models/role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>('users-permissions/roles')
  }
}
