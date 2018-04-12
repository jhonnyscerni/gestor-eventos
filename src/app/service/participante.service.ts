import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Participante } from '../domain/participante';

@Injectable()
export class ParticipanteService {

    private url: string = `${environment.urlbase}/participantes`;

    constructor(private http: Http) { }

    /**
     * Find all participantes
     */
    public getParticipantes(): Observable<Participante[]> {
        return this.http.get(this.url)
            .map(res => res.json());
    }


}
