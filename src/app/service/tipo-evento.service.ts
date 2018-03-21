import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { TipoEvento } from '../domain/tipo-evento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TipoEventoService {

private url: string = `${environment.urlbase}/tipo-evento`;

constructor(private http: Http) { }

   /**
     * Find all unidades
     */
    public getTipoEventos(): Observable<TipoEvento[]> {
        return this.http.get(this.url)
            .map(res => res.json());
    }


}