import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';

export class UploadProgress {
    public file: File
    public observable: Observable<HttpEvent<any>>
}

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) { }

    public upload(files: File[]): UploadProgress[] {
        var uploadProgressList = []
        files.forEach(file => {
            var formData = new FormData()
            formData.append('files', file)
            var uploadProgress = new UploadProgress()
            uploadProgress.file = file
            uploadProgress.observable = this.http.post<any>('upload', formData, { reportProgress: true })
            uploadProgressList.push(uploadProgress)
        })

        return uploadProgressList
    }

    public deleteUpload(id: number): Observable<any> {
        return this.http.delete('upload/files/' + id)
    }
    
}