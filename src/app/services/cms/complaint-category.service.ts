import { ComplaintCategory } from  '../../models/cms.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ComplaintCategoryService{
    constructor(private http:HttpClient){}

    public list():Observable<Array<ComplaintCategory>>{
        return this.http.get<Array<ComplaintCategory>>('complaint-categories')
    }
}