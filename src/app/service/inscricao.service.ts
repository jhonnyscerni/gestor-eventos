import { Inscricao } from './../domain/inscricao';
import { Observable } from 'rxjs/Rx';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { DateTimeService } from '../@core/util/date-time.service';
import { InscricaoFiltro } from '../domain/inscricao-filtro';
import { Page } from '../@core/model/page';

@Injectable()
export class InscricaoService {

    inscricao: Inscricao;

    private url: string = `${environment.urlbase}/inscricoes`;

    constructor(
        private dtService: DateTimeService,
        private http: Http
    ) { }

    getInscricoesByEvento(idEvento: number): Observable<Page<Inscricao>> {
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


      pesquisa(idEvento: number, filtro: InscricaoFiltro,size: number, page: number): Observable<Page<Inscricao>> {

        const params = new URLSearchParams();
    
        if(filtro.participante.nome) {
          params.set('participante.nome', filtro.participante.nome);
        }

        if(filtro.participante.nomeCracha) {
            params.set('participante.nomeCracha', filtro.participante.nomeCracha);
          }
    
        if(filtro.participante.cpf) {
          params.set('participante.cpf', filtro.participante.cpf);
        }

        if(filtro.categoriaParticipante.titulo) {
          params.set('categoriaParticipante.titulo', filtro.categoriaParticipante.titulo);
        }

        return this.http.get(`${environment.urlbase}/eventos/${idEvento}/inscricoes?page=${page}&size=${size}`, {search: params}).map(res => res.json());
     
      }

      //SEM PESQUISA

      // getInscricaoPaginado(idEvento: number,size: number, page: number):Observable<Page<Inscricao>> {
      //   return this.http.get(`${environment.urlbase}/eventos/${idEvento}/inscricoes?page=${page}&size=${size}`)
      //   .map(res => res.json());

      // }
    


}
