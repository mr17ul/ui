import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentMaster, RentDetails, UploadUTR } from '../../models/rentadmin.model';

@Injectable({
  providedIn: 'root'
})
export class RentMasterService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Array<RentMaster>> {
    return this.http.get<Array<RentMaster>>('rent-masters?_limit=-1')
  }

  public create(rentMaster: RentMaster): Observable<any> {
    return this.http.post("rent-masters", rentMaster)
  }

  public update(rentMaster: RentMaster): Observable<any> {
    return this.http.put("rent-masters/" + rentMaster.id, rentMaster);
  }


  public deleteRentMaster(rentMasterid: number): Observable<any> {
    return this.http.delete("rent-masters/" + rentMasterid);
  }

  public createRentDetail(rentDetails: RentDetails): Observable<any> {
    return this.http.post("rent-details", rentDetails)
  }

  public updateRentDetail(rentDetails: RentDetails): Observable<any> {
    return this.http.put("rent-details/" + rentDetails.id, rentDetails)
  }

  public monthlyRentReport(filterParam): Observable<Array<RentMaster>> {
    return this.http.get<Array<RentMaster>>('rent-masters/report/' + filterParam);
  }

  public uploadTransaction_Details(uploadUTR: UploadUTR): Observable<any> {
    return this.http.post("transaction-details", uploadUTR)
  }

  public getTransactionDetails(): Observable<UploadUTR[]> {
    return this.http.get<UploadUTR[]>("transaction-details?_limit=-1")
  }

  public dashboard(): Observable<any> {
    return this.http.get("rent-masters/dashboard")
  }

  public branchStatement(rentMaster: RentMaster, from: Date, to: Date):Observable<any> {
    return this.http.get(`rent-masters/branch-statement/${rentMaster.id}/${from.getTime()}/${to.getTime()}`)
  }

}
