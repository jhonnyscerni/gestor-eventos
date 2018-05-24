import { RouteMapping } from './route-mapping';
import { KeycloakService } from './keycloak.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let routeMapping: RouteMapping = this.createRouteMappingFromData(route.data);
        let isAuthorizedRoute: boolean = false;

        for (let role of routeMapping.roles) {
            if (KeycloakService.hasResourceRoleAngular(role)) {
                isAuthorizedRoute = true;
                break;
            }
        }

        if (!isAuthorizedRoute) {
            if (routeMapping.mensagem == '') {
                this.router.navigate([routeMapping.redirect]);
            } else {
                this.router.navigate([routeMapping.redirect], { queryParams: { msg: routeMapping.mensagem } });
            }
        }
        return isAuthorizedRoute;

    }



    /**
    * Captura as informações da Rota e preserva os valores default
    * 
    * @param data informações da Rota
    */
    private createRouteMappingFromData(data: any): RouteMapping {
        let mapping: RouteMapping = new RouteMapping();

        for (let keyData in data) {
            for (let keyMapping in mapping) {
                if (keyData == keyMapping) {
                    mapping[keyMapping] = data[keyData];
                }
            }
        }

        return mapping;
    }
}
