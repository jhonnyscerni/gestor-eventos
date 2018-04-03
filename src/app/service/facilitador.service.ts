import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Facilitador } from '../domain/facilitador';

@Injectable()
export class FacilitadorService {

    constructor(
        private http: Http
    ) { }

    public getfacilitadoresByEvento(idEvento: number): Observable<Facilitador[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/facilitadores`)
            .map(res => res.json());
    }
}