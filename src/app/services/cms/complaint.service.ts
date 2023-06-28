import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from '../../models/cms.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export interface ManyWrapper<T> {
  complaints: T[]
}

export interface SingleWrapper {
  complaint: Complaint
}

export const LIST_COMPLAINTS = gql`
query listComplaints($userId:Int){
    complaints(sort:"complaintDate:desc",where:{
      branch:{users:{id:$userId}}
    }){
      memberId
      memberName
      groupId
      groupName
      id
      mobileNo
      category{
        name
      }
      details
      complaintDate
      bank{
        name
      }
      branch{
        name
        district{
          name
          state{
            name
          }
        }
      }
      complaintActions(sort:"created_at:desc"){
        actionTaken
        created_at
        actor{
          username
        }
        remarks
      }
      attachments{
        url
        name
      }
     
    }
  }`

@Injectable()
export class ComplaintService {
  constructor(private http: HttpClient,
    private apollo: Apollo,
    private auth: AuthService) { }

  public list(): Observable<Array<Complaint>> {
    return this.http.get<Array<Complaint>>('complaints')
  }

  public listDeep(): Observable<Array<Complaint>> {

    return this.apollo.query<ManyWrapper<Complaint>>({
      query: LIST_COMPLAINTS,
      variables: { userId: this.auth.user.id }
    }).pipe(map(res => res.data.complaints))
  }

  public find(id: number): Observable<Complaint> {
    return this.apollo.query<SingleWrapper>({
      query: gql`query compl($id:ID!){
                complaint(id:$id){
                  memberId
                  memberName
                  groupId
                  groupName
                  id
                  mobileNo
                  category{
                    name
                  }
                  details
                  complaintDate
                  bank{
                    name
                  }
                  branch{
                    name
                    district{
                      name
                      state{
                        name
                      }
                    }
                  }
                  complaintActions(sort:"created_at:desc"){
                    actionTaken
                    created_at
                    actor{
                      username
                    }
                    remarks
                  }
                  attachments{
                    url
                    name
                  }
                }
              }`, variables: {
        id: id
      }
    }).pipe(map(res => res.data.complaint))
  }

  public create(complaint: Complaint): Observable<any> {
    return this.http.post("complaints", complaint)

  }

  public update(complaint: Complaint): Observable<any> {
    return this.http.put("complaints", complaint)
  }

  public downloadReport(): Observable<Blob> {
    return this.http.get("complaints/reports", { responseType: 'blob' })
  }

}