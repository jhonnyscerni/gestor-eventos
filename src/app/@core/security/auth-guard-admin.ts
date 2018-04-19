import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { KeycloakService } from "./keycloak.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuardAdmin implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return 
    }
}
