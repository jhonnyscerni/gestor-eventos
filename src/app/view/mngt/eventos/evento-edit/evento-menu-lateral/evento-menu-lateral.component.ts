import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'evento-menu-lateral',
  templateUrl: './evento-menu-lateral.component.html',
  styleUrls: ['./evento-menu-lateral.component.scss']
})
export class EventoMenuLateralComponent implements OnInit {

  id: number;

  constructor(
    public media: TdMediaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

}
