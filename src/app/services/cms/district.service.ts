import { Injectable } from '@angular/core';
import { District, State } from '../../models/cms.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DistrictService {
    constructor(private http: HttpClient) { }

    public list(stateCode: string): Observable<Array<District>> {
        return this.http.get<Array<District>>('districts?state.code=' + stateCode)
    }

    public listAll(): Observable<Array<District>> {
        return this.http.get<Array<District>>('districts?_limit=-1&_sort=name:ASC')
    }
}