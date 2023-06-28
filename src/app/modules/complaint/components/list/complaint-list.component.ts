import { Component, ViewChild, HostListener } from '@angular/core';
import { State, Bank, Branch, District, ComplaintCategory, Complaint } from '../../../../models/cms.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ComplaintService } from '../../../../services/cms/complaint.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "complaint-list",
    templateUrl: "complaint-list.component.html",
    styleUrls: ["complaint-list.component.scss"]
})
export class ComplaintListComponent {

    complaints: Complaint[]
    narrowWidthColumns = ['complaintId', 'complaintDate', 'memberName', 'status']
    wideWidthColumns = ['complaintId', 'complaintDate', 'memberName', 'groupName', 'category', 'bank', 'branch', 'status']
    displayedColumns: string[] = [];

    isNarrowWidth = false

    dataSource = new MatTableDataSource<Complaint>(this.complaints)

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private complaintService: ComplaintService,
        private router: Router,
        private route: ActivatedRoute) {
        this.dataSource.paginator = this.paginator
        this.onResize()

    }

    ngAfterViewInit() {
        this.complaintService.listDeep().subscribe(r => {
            this.complaints = r
        })
    }

    public viewComplaint(complaint: Complaint) {
        this.router.navigate(['view-complaint'], { state: { complaint: complaint }, relativeTo: this.route.parent })
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        if (window.innerWidth < 800) {
            console.log('Changed to narrow')
            this.isNarrowWidth = true
            this.displayedColumns = this.narrowWidthColumns
        } else {
            this.isNarrowWidth = false
            this.displayedColumns = this.wideWidthColumns
        }
    }

    public downloadReport() {
        this.complaintService.downloadReport().subscribe(report => {
            // var blob = new Blob([report], { type: 'application/vnd.ms-excel' });

            var downloadURL = window.URL.createObjectURL(report);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "report.xls";
            link.click();

        })
    }

}