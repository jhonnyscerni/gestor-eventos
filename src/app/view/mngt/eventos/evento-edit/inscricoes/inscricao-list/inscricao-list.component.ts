import { Evento } from './../../../../../../domain/evento';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { InscricaoService } from '../../../../../../service/inscricao.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Inscricao } from '../../../../../../domain/inscricao';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
import { InscricaoFiltro } from '../../../../../../domain/inscricao-filtro';
import { Page } from '../../../../../../@core/model/page';

@Component({
  selector: 'app-inscricao-list',
  templateUrl: './inscricao-list.component.html',
  styleUrls: ['./inscricao-list.component.css']
})
export class InscricaoListComponent implements OnInit {

  inscricaoPage: Page<Inscricao> = new Page<Inscricao>();

  filtro = new InscricaoFiltro();

  idEvento: number;

  inscricao: Inscricao = new Inscricao();

  constructor(
    private inscricaoService: InscricaoService,
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
      this.getInscricoesByEvento();
      this.inscricao.evento.id = this.idEvento;
    })
  }

  getInscricoesByEvento() {
    this.inscricaoService.getInscricoesByEvento(this.idEvento).subscribe(
      page => {
        this.inscricaoPage = page;
      }
    );
  }

  doSearch() {
    this.inscricaoService.pesquisa(this.idEvento, this.filtro).subscribe(page => {
      this.inscricaoPage = page;
    })
  }

  excluirInscricaoByEvento(id: number) {
    this._dialogService.openConfirm({
      message: 'Deseja excluir esta Inscrição do Evento ?',
      disableClose: true,
      title: 'Exclusão',
      cancelButton: 'Não',
      acceptButton: 'Sim',
    }).afterClosed().subscribe((aceitou: boolean) => {
      if (aceitou) {
        this.inscricaoService.excluirInscricaoByEvento(id)
          .subscribe(() => {
            this.getInscricoesByEvento();
          })
      } else {
        console.log('Não aceitou excluir a Inscrição do evento');
      }
    })
  }

  public dateLayout(dt: any): String {
    return Moment(dt).format('DD/MM/YYYY [às] HH:mm:ss');
  }

}
