import { Inscricao } from './../domain/inscricao';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { DateTimeService } from '../@core/util/date-time.service';

@Injectable()
export class InscricaoService {

    inscricao: Inscricao;

    private url: string = `${environment.urlbase}/inscricoes`;

    constructor(
        private http: Http
    ) { }

    getInscricoesByEvento(idEvento: number): Observable<Inscricao[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/inscricoes`)
            .map(res => res.json());
    }

    getInscricao(idInscricao: number): Observable<Inscricao> {
        return this.http.get(`${this.url}/${idInscricao}`).map(res => res.json());
    }

    excluirInscricaoByEvento(idInscricao: number) {
       return this.http.delete(`${this.url}/${idInscricao}`);
    }

    public salvar(inscricao: Inscricao, idEvento: number): Observable<Inscricao> {
        if (inscricao.id || inscricao.id == 0) {
            return this.http.put(`${environment.urlbase}/eventos/${idEvento}/inscricao/${inscricao.id}`, inscricao)
                .map(res => res.json());
        } else {
            return this.http.post(`${environment.urlbase}/eventos/${idEvento}/inscricao`, inscricao)
                .map(res => res.json());
        }
    }

}
