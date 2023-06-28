import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint, ComplaintAction } from 'src/app/models/cms.model';
import { Apollo } from 'apollo-angular';
import { SingleWrapper } from './complaint.service';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable()
export class ComplaintActionService {

  complaintActions = gql`query actions($id:ID!){
        complaint(id:$id){
          complaintActions(sort:"created_at:desc"){
            actionTaken
            created_at
            actor{
              username
            }
            remarks
          }
        }
      }`

  constructor(private http: HttpClient,
    private apollo: Apollo) {

  }


  public create(complaintAction: ComplaintAction) {
    this.apollo.getClient().writeFragment({
      fragment: gql`
        fragment update on complaintActions{
          
          complaintActions(sort:"created_at:desc"){
            actionTaken
            created_at
            remarks
          }
        }
        `,
      id: `ROOT_QUERY.complaints({"sort":"complaintDate:desc"}).${complaintAction.complaint.id}`,
      data: { complaintActions: [complaintAction] }
    })
    return this.http.post("complaint-actions", complaintAction)
  }
}