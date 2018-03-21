import { Evento } from './../domain/evento';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Page } from '../@core/model/page';
import 'rxjs/add/operator/map';
import { DateTimeService } from '../@core/util/date-time.service';

@Injectable()
export class EventoService {

    private url: string = `${environment.urlbase}/eventos`;

    constructor(private http: Http, private dtService: DateTimeService) { }

     /**
     * Find all Eventos
     */
    public getEventos(): Observable<Page<Evento>> {
        return this.http.get(this.url)
            .map(res => res.json());
    }


    /**
     * @param id
     */
    getEvento(id: number): Observable<Evento> {
      return this.http.get(`${this.url}/${id}`).map((res: any) => {
            const eventoAlterado: Evento = res.json() as Evento;
            this.localAdjustDateTimeFromJSON([eventoAlterado]);
            return eventoAlterado;
           });
    }

  public salvar(evento: Evento): Observable<Evento> {
    this.localAdjustDateTimeToJSON([evento]);
    if (evento.id || evento.id == 0) {
      return this.http.put(`${this.url}/${evento.id}`, evento).map(res => res.json());
    } else {
      return this.http.post(this.url, evento).map(res => res.json());
    }
  }

  excluirEvento(id: number) {
    return this.http.delete(this.url + '/' + id);
  }


  private localAdjustDateTimeFromJSON(eventos: Evento[]): void {
    for (const evento of eventos) {
      if (evento.inicioEvento) {
        evento.inicioEvento = this.dtService.adjustDateTimeFromJSON(evento.inicioEvento);
      }
      if (evento.fimEvento) {
        evento.fimEvento = this.dtService.adjustDateTimeFromJSON(evento.fimEvento);
      }
      if (evento.inicioInscricao) {
        evento.inicioInscricao = this.dtService.adjustDateTimeFromJSON(evento.inicioInscricao);
      }
      if (evento.fimInscricao) {
        evento.fimInscricao = this.dtService.adjustDateTimeFromJSON(evento.fimInscricao);
      }
    }
  }
 
  private localAdjustDateTimeToJSON(eventos: Evento[]): void {
    for (const evento of eventos) {
      if (evento.inicioEvento) {
        evento.inicioEvento = this.dtService.adjustDateTimeToJSON(evento.inicioEvento);
      }
      if (evento.fimEvento) {
        evento.fimEvento = this.dtService.adjustDateTimeToJSON(evento.fimEvento);
      }
      if (evento.inicioInscricao) {
        evento.inicioInscricao = this.dtService.adjustDateTimeToJSON(evento.inicioInscricao);
      }
      if (evento.fimInscricao) {
        evento.fimInscricao = this.dtService.adjustDateTimeToJSON(evento.fimInscricao);
      }
    }
  }

}