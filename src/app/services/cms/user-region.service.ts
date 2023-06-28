import { Injectable } from '@angular/core';
import { UserRegion } from 'src/app/models/cms.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class UserRegionService {

    constructor(private http: HttpClient) { }

    public map(userRegion: UserRegion): Observable<UserRegion> {
        return this.http.post<UserRegion>('user-regions', userRegion)
    }

    public load(user: UserModel): Observable<UserRegion> {
        return this.http.get<UserRegion>('user-regions?user.id=' + user.id).pipe(map(r => r[0]))
    }

}