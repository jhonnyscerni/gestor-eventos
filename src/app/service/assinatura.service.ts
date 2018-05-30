import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Assinatura } from '../domain/assinatura';

@Injectable()
export class AssinaturaService {

private url: string = `${environment.urlbase}/assinaturas`;

constructor(private http: Http) { }

public getAssinaturas(): Observable<Assinatura[]> {
    return this.http.get(this.url)
        .map(res => res.json());
}

}
