import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Frequencia } from '../domain/frequencia';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class FrequenciaService {

    private url: string = `${environment.urlbase}/frequencia`;

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: Http
    ) { }

    presenca(uuid: string): Observable<any> {
        return this.http.post(`${this.url}/create/${uuid}`, null)
        .map(res => res.json())
        .catch((error: any) => {
            if (error.status == 400) {
              // this.alertService.showError(error.statusText);
              this.errorHandlerService.handle(error._body);
          } 
  
          return Observable.throw(error);
          } );
    }


     getFrequenciaByEvento(idEvento: number): Observable<Frequencia[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/frequencia`)
            .map(res => res.json());
    }

    getFrequenciaByEventoByInscricao(idEvento: number, idInscricao: number): Observable<Frequencia[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/frequencia/${idInscricao}`)
            .map(res => res.json());
    }

    excluirFrequenciaByEvento(idInscricao: number) {
        return this.http.delete(`${this.url}/${idInscricao}`);
     }


}
