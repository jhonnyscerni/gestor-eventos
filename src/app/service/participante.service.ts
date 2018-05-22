import { KeycloakService } from './../@core/security/keycloak.service';
import { Participante } from './../domain/participante';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { DateTimeService } from '../@core/util/date-time.service';
import 'rxjs/add/operator/map';
import { Inscricao } from '../domain/inscricao';
import { Page } from '../@core/model/page';
import { userInfo } from 'os';

@Injectable()
export class ParticipanteService {

    participante: Participante;

    private participanteLogado: Participante;

    private url: string = `${environment.urlbase}/participantes`;

    constructor(private http: Http, private dtService: DateTimeService, private keycloakService: KeycloakService) { }

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
    if(this.participanteLogado){

    }
    return this.participanteLogado;
  }

  initParticipanteLogado(){
    console.log("ENTROUUUUUUUUU");
    return new Promise((resolve: any)=>{
      this.http.get(`${this.url}/verificar?email=${KeycloakService.auth.authz.tokenParsed.email}`)
    .map(res => {
      if(res.status === 200){
        this.participanteLogado = res.json();
        console.log(this.participanteLogado);
      }
      return this.participanteLogado;
    })
    .catch(e=>{
      console.log(e);
      let ob:Observable<Participante> = new Observable();
      if(e.status === 404){
        console.log('Participante nao encontrado.');
        console.log(userInfo);
        let participante = new Participante;
        participante.email = KeycloakService.auth.authz.tokenParsed;
        participante.nome = KeycloakService.auth.authz.tokenParsed.name;
        participante.cpf = KeycloakService.auth.authz.tokenParsed.cpf;
        ob = this.salvar(participante).map(participante=>this.participanteLogado = participante);
      }
      return ob;
    }).subscribe(participante=>{},
                  (err)=> {},
                  ()=> resolve(true));
    });
  }

  buscarParticipanteEmail():Observable<Participante> {
    console.log("busca por email");
    return this.http.get(`${this.url}/verificar?email=${KeycloakService.auth.authz.tokenParsed.email}`)
    .map(res => {
      if(res.status === 200){
        this.participanteLogado = res.json();
        //console.log(this.participanteLogado);
      }
      return this.participanteLogado;
    })
    .catch(e=>{
      //console.log(e);
      let ob:Observable<Participante> = new Observable();
      if(e.status === 404){
        //console.log('Participante nao encontrado.');
        //console.log(userInfo);
        let participante = new Participante;
        participante.email = KeycloakService.auth.authz.tokenParsed;
        participante.nome = KeycloakService.auth.authz.tokenParsed.name;
        participante.cpf = KeycloakService.auth.authz.tokenParsed.cpf;
        ob = this.salvar(participante).map(participante=>this.participanteLogado = participante);
      }
      return ob;
    });
  }




  getInscricoesByParticipante(idParticipante: number): Observable<Page<Inscricao>> {
    console.log(this.participanteLogado);
    return this.http.get(`${environment.urlbase}/inscricoes/minhas-inscricoes?idParticipante=${idParticipante}`)
      .map(res => res.json());
  }

  load(): Promise<any> {
    console.log("Init")
    let promise: Promise<any> = new Promise((resolve: any) => {
            this.http.get(`${this.url}/verificar?email=${KeycloakService.auth.authz.tokenParsed.email}`)
                    .map(res => res.json())
                    .subscribe(config => {
                            console.log("Inicializacao...")
                            resolve(true);
                            
                    });
    });
    return promise;
}



}
