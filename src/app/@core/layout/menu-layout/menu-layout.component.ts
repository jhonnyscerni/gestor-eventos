import { KeycloakService } from './../../security/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { ParticipanteService } from '../../../service/participante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {

  userInfo: any = { email: '', family_name: '', given_name: '', name: '', preferred_username: '', sub: '' };

  participanteLogado: any;

  constructor(
    private participanteService: ParticipanteService,
    private keycloakService: KeycloakService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
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
