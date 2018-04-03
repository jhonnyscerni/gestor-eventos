import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facilitador-edit',
  templateUrl: './facilitador-edit.component.html',
  styleUrls: ['./facilitador-edit.component.css']
})
export class FacilitadorEditComponent implements OnInit {

  generos = [
    'Masculino',
    'Feminio',
  ];

  constructor() { }

  ngOnInit() {
  }

}
