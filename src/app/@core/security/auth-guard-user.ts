import { ParticipanteService } from './../../service/participante.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { KeycloakService } from "./keycloak.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuardUser implements CanActivate {

    constructor(
        private participanteService: ParticipanteService,
        private keycloakService: KeycloakService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return true;
    }
}
