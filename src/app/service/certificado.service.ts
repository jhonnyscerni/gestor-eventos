import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Certificado } from '../domain/certificado';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CertificadoService {

    certificado: Certificado;

    private url: string = `${environment.urlbase}/certificados`;

    constructor(
        private http: Http
    ) { }


    public getCertificadoByEvento(idEvento: number): Observable<Certificado[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/certificado`)
            .map(res => res.json());
    }


    excluirCertificadoByEvento(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    getCertificado(id: number): Observable<Certificado> {
        return this.http.get(`${this.url}/${id}`).map(res => res.json());
    }

    public salvar(certificado: Certificado, idEvento: number): Observable<Certificado> {
        if (certificado.id || certificado.id == 0) {
            return this.http.put(`${environment.urlbase}/eventos/${idEvento}/certificado/${certificado.id}`, certificado)
            .map(res => res.json());
        } else {
            return this.http.post(`${environment.urlbase}/eventos/${idEvento}/certificado`, certificado)
            .map(res => res.json());
        }
    }

}
