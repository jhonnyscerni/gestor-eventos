import { CategoriaParticipanteEvento } from './../domain/categoria-participante-evento';
import { Observable } from 'rxjs/Rx';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class CategoriaParticipanteEventoService {

    categoriaParticipanteEvento: CategoriaParticipanteEvento;

    private url: string = `${environment.urlbase}/categoria-participante-evento`;

    constructor(private http: Http) { }

    /**
  * Find all Eventos
  */
    public getCategoriaParticipantesEventoByEvento(idEvento: number): Observable<CategoriaParticipanteEvento[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/categoria-participante-evento`)
            .map(res => res.json());
    }

    getCategoriaParticipanteEvento(id: number): Observable<CategoriaParticipanteEvento> {
        return this.http.get(`${this.url}/${id}`).map((res: any) => {
            const categoriaParticipanteEventoAlterado: CategoriaParticipanteEvento = res.json() as CategoriaParticipanteEvento;
            return categoriaParticipanteEventoAlterado;
          });
    }

    public salvar(categoriaParticipanteEvento: CategoriaParticipanteEvento, idEvento: number): Observable<CategoriaParticipanteEvento> {
        if (categoriaParticipanteEvento.id || categoriaParticipanteEvento.id == 0) {
          return this.http.put(`${environment.urlbase}/eventos/${idEvento}/categoria-participante-evento/${categoriaParticipanteEvento.id}`
          , categoriaParticipanteEvento).map(res => res.json());
        } else {
          return this.http.post(`${environment.urlbase}/eventos/${idEvento}/categoria-participante-evento`
          , categoriaParticipanteEvento).map(res => res.json());
        }
      }

      excluirCategoriaParticipanteEvento(id: number) {
        return this.http.delete(this.url + '/' + id);
      }

}