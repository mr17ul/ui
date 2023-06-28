import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { concatMap, map, mergeMap } from "rxjs/operators";
import { BranchAction, RentMaster } from "src/app/models/rentadmin.model";
import { RentMasterService } from "./rent-master.service";

@Injectable()
export class BranchActionsService {

    constructor(private http: HttpClient, private rentSvc: RentMasterService) { }

    public list(): Observable<BranchAction[]> {
        return this.http.get<BranchAction[]>('branch-actions?_limit=-1')
    }

    public create(branchAction: BranchAction, rentMaster: RentMaster) {
        return this.http.post<BranchAction>('branch-actions', branchAction)
            .pipe(concatMap(res => {
                console.log(rentMaster)
                if (!rentMaster.branch_actions) {
                    rentMaster.branch_actions = new Array()
                }
                rentMaster.branch_actions.push(res)
                delete res.rent_master
                return this.rentSvc.update(rentMaster)
            }))
    }

    public delete(branchAction: BranchAction, rentMaster: RentMaster) {
        return this.http.delete<BranchAction>('branch-actions/' + branchAction.id)
            .pipe(concatMap(res => {
                console.log(rentMaster)
                if (!rentMaster.branch_actions) {
                    rentMaster.branch_actions = new Array()
                }
                var index = rentMaster.branch_actions.findIndex(ba => ba.id == branchAction.id)

                if (index > -1) {
                    rentMaster.branch_actions.splice(index, 1)
                }

                delete res.rent_master
                return this.rentSvc.update(rentMaster)
            }))
    }

}