import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get<any>('users')
  }

  public create(user: UserModel): Observable<any> {
    return this.http.post("users", user)
  }


  public update(user: UserModel): Observable<any> {
    return this.http.put("users/"+ user.id, user)
  }

}
