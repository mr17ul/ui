import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../../models/cms.model';

@Injectable()
export class BranchService{
    constructor(private http:HttpClient){}

    public list(districtCode:number):Observable<Array<Branch>>{
        return this.http.get<Array<Branch>>('branches?district.code='+districtCode)
    }
}