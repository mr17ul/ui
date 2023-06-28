import { Observable } from 'rxjs';
import { State } from   '../../models/cms.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StateService{
    constructor(private http:HttpClient){}

    public list():Observable<Array<State>>{
        return this.http.get<Array<State>>('states')
    }
}