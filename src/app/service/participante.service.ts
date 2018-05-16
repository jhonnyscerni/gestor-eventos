import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Participante } from '../domain/participante';
import { DateTimeService } from '../@core/util/date-time.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipanteService {

    participante: Participante;

    private participanteLogado: Participante;

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

  public getParticipanteLogado(): Participante{
    return this.participanteLogado;
  }

  buscarParticipanteEmail(email: string, userInfo: any) {
    return this.http.get(`${this.url}/verificar?email=${email}`)
    .map(res => {
      if(res.status === 200){
        this.participanteLogado = res.json();
        console.log(userInfo);
      }
    })
    .catch(e=>{
      console.log(e);
      if(e.status === 404){
        console.log('Participante nao encontrado.');
        console.log(userInfo);
        let participante = new Participante;
        participante.email = userInfo.email;
        participante.nome = userInfo.name;
        participante.cpf = userInfo.cpf;
        this.salvar(participante).subscribe(participante=>this.participanteLogado = participante);
      }
      return new Observable();
    });
  }


}
