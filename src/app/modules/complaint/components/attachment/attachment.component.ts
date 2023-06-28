import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { UploadService } from 'src/app/services/cms/upload.service';

@Component({
    selector: 'attachment',
    templateUrl: 'attachment.component.html'
})
export class AttachmentComponent {
    @ViewChild('file', { static: false }) file;

    public files: Set<File> = new Set();

    uploadFiles: Map<File, any> = new Map()


    constructor(private uploadSvc: UploadService) { }

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;

        for (let key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
            }
        }

        var progress = this.uploadSvc.upload(Array.from(this.files))
        progress.forEach(prg => {
            prg.observable.subscribe(event => {
                console.log('Received event')
                console.log(event)
                this.uploadFiles.set(prg.file, event[0].id)
            })
        })


    }

    public isUploadPending(): boolean {
        return this.files.size != this.uploadFiles.size
    }

    public getUploadedRefs(): any[] {
        return Array.from(this.uploadFiles.values()).map(id => ({ id: id }))
    }

    public remove(file) {
        this.uploadSvc.deleteUpload(this.uploadFiles.get(file)).subscribe(() => {
            this.files.delete(file)
            this.uploadFiles.delete(file)
        })
    }

    addFiles() {
        this.file.nativeElement.click();
    }
}