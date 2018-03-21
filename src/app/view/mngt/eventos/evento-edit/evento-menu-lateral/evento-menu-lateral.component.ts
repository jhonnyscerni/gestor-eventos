import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'evento-menu-lateral',
  templateUrl: './evento-menu-lateral.component.html',
  styleUrls: ['./evento-menu-lateral.component.css']
})
export class EventoMenuLateralComponent implements OnInit {

  constructor(
    public media: TdMediaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
