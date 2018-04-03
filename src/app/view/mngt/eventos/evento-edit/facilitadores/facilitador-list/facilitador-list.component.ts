import { FacilitadorService } from './../../../../../../service/facilitador.service';
import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../../../../domain/evento';

@Component({
  selector: 'app-facilitador-list',
  templateUrl: './facilitador-list.component.html',
  styleUrls: ['./facilitador-list.component.css']
})
export class FacilitadorListComponent implements OnInit {

  idEvento: number;

  evento: Evento = new Evento();

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: '#', width: 50 },
    { name: 'nome', label: 'Nome', width: 250 },
    { name: 'tituloProfissional', label: 'Título', width: 200 },
    { name: 'instituicao', label: 'Instituição', width: 150 },
    { name: 'origem', label: 'Origem', width: 150 },
    { name: 'acoes', label: 'Ações', width: 200 },
  ];

  data = [];

  constructor(
    private facilitadorService: FacilitadorService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Facilitadores');
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      console.log(`idEvento na area de Facilitadores:` + this.idEvento);
      this.getFacilitadoresbyEvento();
      this.evento.id = this.idEvento;
    });
  }

  getFacilitadoresbyEvento() {
    this.facilitadorService.getfacilitadoresByEvento(this.idEvento).subscribe(
      data => this.data = data
    );
  }

}
