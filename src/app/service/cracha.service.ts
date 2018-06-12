import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cracha } from '../domain/cracha';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CrachaService {

    cracha: Cracha;

    private url: string = `${environment.urlbase}/cracha`;

constructor(
    private http: Http
) { }

public getCrachaByEvento(idEvento: number): Observable<Cracha> {
    return this.http.get(`${environment.urlbase}/eventos/${idEvento}/cracha`)
        .map(res => res.json());
}

}
