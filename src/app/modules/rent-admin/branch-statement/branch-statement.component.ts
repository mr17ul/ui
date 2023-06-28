import { Component } from "@angular/core";
import { RentMaster } from "src/app/models/rentadmin.model";
import { RentMasterService } from "src/app/services/RentAdmin/rent-master.service";
import * as XLSX from 'xlsx';

@Component({
    selector: 'branch-statement',
    templateUrl: 'branch-statement.component.html',
    styleUrls: ['branch-statement.component.scss']
})
export class BranchStatementComponent {

    rentMasters: RentMaster[]

    fromDate: Date
    toDate: Date
    rentMaster: RentMaster

    constructor(private rentMasterSvc: RentMasterService) {

    }

    ngOnInit() {
        this.rentMasterSvc.list().subscribe(r => {
            this.rentMasters = r.sort((a, b) => a.branch.name.localeCompare(b.branch.name))
        })
    }

    generateReport() {
        this.rentMasterSvc.branchStatement(this.rentMaster, this.fromDate, this.toDate).subscribe(r => {
            var rm = r.rentMaster
            var txns = r.txn

            var aoa = [['Txn date', 'UTR', 'Month/Year', 'A/C', 'Landlord mobile', 'Deposit', 'Amount']]

            txns.forEach(txn => {
                aoa.push([txn.txn_date, txn.utr, `${txn.month}/${txn.year}`, rm.LandlordAccountNumber, rm.LandlordMobile, rm.BalDepositAmount, txn.amount])
            });


            const wsheet = XLSX.utils.aoa_to_sheet(aoa)

            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, wsheet, rm.branch.name);
            XLSX.writeFile(wb, 'branch_statement.xlsx')
        })

    }



}