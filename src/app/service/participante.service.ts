import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Participante } from '../domain/participante';
import { DateTimeService } from '../@core/util/date-time.service';

@Injectable()
export class ParticipanteService {

    participante: Participante;

    private url: string = `${environment.urlbase}/participantes`;

    constructor(private http: Http, private dtService: DateTimeService) { }

    /**
     * Find all participantes
     */
    public getParticipantes(): Observable<Participante[]> {
        return this.http.get(this.url)
            .map(res => res.json());
    }


    /**
   * @param id
   */
  getParticipante(id: number): Observable<Participante> {
    return this.http.get(`${this.url}/${id}`).map((res: any) => {
      const participanteAlterado: Participante = res.json() as Participante;
     // this.localAdjustDateTimeFromJSON([participanteAlterado]);
      return participanteAlterado;
    });
  }


  public salvar(participante: Participante): Observable<Participante> {
   // this.localAdjustDateTimeToJSON([participante]);
    if (participante.id || participante.id == 0) {
      return this.http.put(`${this.url}/${participante.id}`, participante).map(res => res.json());
    } else {
      return this.http.post(this.url, participante).map(res => res.json());
    }
  }

  excluirParticipante(id: number) {
    return this.http.delete(this.url + '/' + id);
  }


}
