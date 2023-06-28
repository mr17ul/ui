
import { Injectable } from '@angular/core';
import { Principle,State } from  '../../models/cms.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PrincipleService{
    constructor(private http:HttpClient){}

    public list():Observable<Array<Principle>>{
        return this.http.get<Array<Principle>>('principles')
    }
}