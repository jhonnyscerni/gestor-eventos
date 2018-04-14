import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Frequencia } from '../domain/frequencia';

@Injectable()
export class FrequenciaService {

    private url: string = `${environment.urlbase}/frequencia`;

    constructor(
        private http: Http
    ) { }

    presenca(uuid: string): Observable<any> {
        return this.http.post(`${this.url}/create/${uuid}`, null).map(res => res.json());
    }


    public getFrequenciaByEvento(idEvento: number): Observable<Frequencia[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/frequencia`)
            .map(res => res.json());
    }

    excluirFrequenciaByEvento(idInscricao: number) {
        return this.http.delete(`${this.url}/${idInscricao}`);
     }


}
