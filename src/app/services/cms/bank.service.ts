
import { Injectable } from '@angular/core';
import { Bank } from  '../../models/cms.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BankService{
    constructor(private http:HttpClient){}

    public list():Observable<Array<Bank>>{
        return this.http.get<Array<Bank>>('banks')
    }
}
