import { KeycloakService } from './../../security/keycloak.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  userInfo: any = { email: '', family_name: '', given_name: '', name: '', preferred_username: '', sub: '' };


  constructor(
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
    this.keycloakService.getLoadUserInfo().then(info=>{
      this.userInfo = info;
    });
  }

  getLink(route: string) {
    return `http://${window.location.hostname}:4200/${route}`;
  }

  sair(){
    console.log("Sair")
    this.keycloakService.logout();
  }
}
