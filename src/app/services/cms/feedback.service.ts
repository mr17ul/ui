import { Injectable } from '@angular/core';
import { Feedback } from 'src/app/models/cms.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class FeedbackService {

    constructor(private http: HttpClient) { }

    public sendFeedback(feedback: Feedback): Observable<any> {
        return this.http.post('feedback', feedback)
    }
}