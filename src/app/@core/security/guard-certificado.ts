import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot } from "@angular/router";
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import { CertificadoService } from "../../service/certificado.service";
import { Certificado } from "../../domain/certificado";


@Injectable()
export class GuardCertificado implements CanActivate {

    idEvento: number;

    certificado: Certificado = new Certificado();

    constructor(
        public router: Router,
        private certificadoService: CertificadoService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        let pagina: any ;
        this.idEvento = route.parent.params['id'];

        this.certificadoService.getCertificadoByEvento(this.idEvento)
            .subscribe(certificado => {
                this.certificadoService.certificado = certificado;
                this.certificado = this.certificadoService.certificado;
                if (this.certificado.id) {
                    pagina = this.certificado.id
                    this.router.navigate(['adm','evento','edit', this.idEvento ,'certificado-participante', pagina]);
                }
                else {
                    pagina = "novo"
                    this.router.navigate(['adm','evento','edit', this.idEvento ,'certificado-participante', pagina]);
                }
            })
        return true;


    }
}