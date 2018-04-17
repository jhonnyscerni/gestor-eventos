import { KeycloakService } from './../../security/keycloak.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  constructor(
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
  }

  sair(){
    console.log("Sair")
    this.keycloakService.logout();
  }
}
