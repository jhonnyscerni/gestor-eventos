import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class UploadService {

    private url: string = `${environment.urlbase}/upload`;

    constructor(private http: Http) { }

    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        return this.http.put(`${this.url}/post`, formdata).map(res => res.json());
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.url}/getallfiles`);
    }

}
