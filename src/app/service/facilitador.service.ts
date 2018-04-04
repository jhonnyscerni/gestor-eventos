import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Facilitador } from '../domain/facilitador';

@Injectable()
export class FacilitadorService {

    facilitador: Facilitador;

    private url: string = `${environment.urlbase}/facilitadores`;

    constructor(
        private http: Http
    ) { }

    public getfacilitadoresByEvento(idEvento: number): Observable<Facilitador[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/facilitadores`)
            .map(res => res.json());
    }

    excluirFacilitadorByEvento(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    getFacilitador(id: number): Observable<Facilitador> {
        return this.http.get(`${this.url}/${id}`).map(res => res.json());
    }

    public salvar(facilitador: Facilitador, idEvento: number): Observable<Facilitador> {
        if (facilitador.id || facilitador.id == 0) {
            return this.http.put(`${environment.urlbase}/eventos/${idEvento}/facilitador/${facilitador.id}`, facilitador)
            .map(res => res.json());
        } else {
            return this.http.post(`${environment.urlbase}/eventos/${idEvento}/facilitador`, facilitador)
            .map(res => res.json());
        }
    }
}