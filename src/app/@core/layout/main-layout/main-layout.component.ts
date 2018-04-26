import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../security/keycloak.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit{

  routes: Object[] = [
    {
      title: 'dashboard',
      route: '/',
      icon: 'dashboard',
    }
  ];
  constructor(private _router: Router, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._router.navigate(['/']);
  }

}
