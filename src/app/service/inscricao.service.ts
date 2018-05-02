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
        private dtService: DateTimeService,
        private http: Http
    ) { }

    getInscricoesByEvento(idEvento: number): Observable<Inscricao[]> {
        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/inscricoes`)
            .map(res => res.json());
    }

    getParticpanteByInscricao(idInscricao: number): Observable<Inscricao> {
        return this.http.get(`${this.url}/gerar-cracha/${idInscricao}`)
        .map(res => res.json());
    }

    getCertificadoByInscricaoByParticpanteByEvento(idInscricao: number): Observable<Inscricao> {
        return this.http.get(`${this.url}/gerar-certificado/${idInscricao}`)
        .map(res => res.json());
    }

    getInscricao(idInscricao: number): Observable<Inscricao> {
        return this.http.get(`${this.url}/${idInscricao}`).map((res: any)  => {

            const inscricaoAlterado: Inscricao = res.json() as Inscricao;
            this.localAdjustDateTimeFromJSON([inscricaoAlterado]);
            return inscricaoAlterado });
    }

    excluirInscricaoByEvento(idInscricao: number) {
       return this.http.delete(`${this.url}/${idInscricao}`);
    }

    public salvar(inscricao: Inscricao, idEvento: number): Observable<Inscricao> {
        this.localAdjustDateTimeToJSON([inscricao]);
        if (inscricao.id || inscricao.id == 0) {
            return this.http.put(`${environment.urlbase}/eventos/${idEvento}/inscricao/${inscricao.id}`, inscricao)
                .map(res => res.json());
        } else {
            return this.http.post(`${environment.urlbase}/eventos/${idEvento}/inscricao`, inscricao)
                .map(res => res.json());
        }
    }

    private localAdjustDateTimeFromJSON(inscritos: Inscricao[]): void {
        for (const inscrito of inscritos) {
          if (inscrito.dtInscricao) {
            inscrito.dtInscricao = this.dtService.adjustDateTimeFromJSON(inscrito.dtInscricao);
          }
        }
      }

      private localAdjustDateTimeToJSON(inscritos: Inscricao[]): void {
        for (const inscrito of inscritos) {
          if (inscrito.dtInscricao) {
            inscrito.dtInscricao = this.dtService.adjustDateTimeToJSON(inscrito.dtInscricao);
          }
        }
      }

}
