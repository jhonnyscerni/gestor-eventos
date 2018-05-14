import { Component, OnInit } from '@angular/core';
import { InscricaoService } from '../../../../service/inscricao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { TdDialogService, ITdDataTableColumn } from '@covalent/core';
import { Inscricao } from '../../../../domain/inscricao';

@Component({
  selector: 'app-inscricao-list',
  templateUrl: './inscricao-list.component.html',
  styleUrls: ['./inscricao-list.component.css']
})
export class InscricaoListComponent implements OnInit {


  idEvento: number;

  inscricao: Inscricao = new Inscricao();

  constructor(
    private inscricaoServive: InscricaoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Inscrições');
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      console.log(`idEvento na area de Inscricoes:` + this.idEvento);
      this.inscricao.evento.id = this.idEvento;
    })
  }


}
