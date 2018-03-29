import { CategoriaParticipante } from './../domain/categoria-participante';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoriaParticipanteService {

    private url: string = `${environment.urlbase}/categoria-participante`;

    constructor(private http: Http) { }

    public getCategoriaParticipantes(): Observable<CategoriaParticipante[]> {
        return this.http.get(this.url)
            .map(res => res.json());
    }

}