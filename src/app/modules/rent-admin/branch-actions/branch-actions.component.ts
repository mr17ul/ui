import { Component } from "@angular/core";
import { MatSnackBar, MatTableDataSource } from "@angular/material";
import { BranchAction, RentMaster } from "src/app/models/rentadmin.model";
import { BranchActionsService } from "src/app/services/RentAdmin/branch-actions.service";
import { RentMasterService } from "src/app/services/RentAdmin/rent-master.service";

@Component({
    selector: 'branch-actions',
    templateUrl: 'branch-actions.component.html',
    styleUrls: ['branch-actions.component.scss']
})
export class BranchActionsComponent {

    rentMaster: RentMaster
    rentMasters: RentMaster[]
    filteredRentMasters: RentMaster[]

    branchAction: BranchAction = new BranchAction()
    month: number

    dataTable = new MatTableDataSource<BranchAction>()

    months = [{ k: "January", v: 1 }, { k: "February", v: 2 }, { k: "March", v: 3 },
    { k: "April", v: 4 }, { k: "May", v: 5 }, { k: "June", v: 6 },
    { k: "July", v: 7 }, { k: "August", v: 8 }, { k: "September", v: 9 },
    { k: "October", v: 10 }, { k: "November", v: 11 }, { k: "December", v: 12 }]

    displayedColumns = ["Branch", "ActionDate", "Action", "update"]

    constructor(private rentSvc: RentMasterService,
        private branchActionSvc: BranchActionsService,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.rentSvc.list().subscribe(r => {
            this.rentMasters = r.sort((a, b) => a.branch.name.localeCompare(b.branch.name))
            this.filteredRentMasters = this.rentMasters
        })

        this.loadBranchActions()

        var currentMonth = new Date()
        // Remove past months
        this.months.splice(0, currentMonth.getMonth())
    }

    loadBranchActions() {
        this.branchActionSvc.list().subscribe(r => {
            this.dataTable.data = r
        })
    }

    createAction() {
        var actionDate = new Date()
        actionDate.setMonth(this.month - 1)
        this.branchAction.actionMonth = actionDate

        var rm = this.rentMasters.find(rm => rm.id == this.branchAction.rent_master.id)
        this.branchActionSvc.create(this.branchAction, rm).subscribe(r => {
            this.loadBranchActions()
            this._snackBar.open("Processed successfully", "OK", { duration: 2000 })
        }, e => {
            console.error(e)
            this._snackBar.open("Something went wrong!", "OK", { duration: 2000 })
        })
    }

    onKey(value: string) {
        this.filteredRentMasters = this.rentMasters.filter(rm => rm.branch.name.toLowerCase().startsWith(value))
    }

    delete(row) {
        var rm = this.rentMasters.find(rm => rm.id == row.rent_master.id)
        this.branchActionSvc.delete(row, rm).subscribe(r => {
            this.loadBranchActions()
            this._snackBar.open("Deleted successfully", "OK", { duration: 2000 })
        }, e => {
            this._snackBar.open("Something went wrong!", "OK", { duration: 2000 })
        })
    }




}