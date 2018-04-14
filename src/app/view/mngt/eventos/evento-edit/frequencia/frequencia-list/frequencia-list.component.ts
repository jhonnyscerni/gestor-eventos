import { Frequencia } from './../../../../../../domain/frequencia';
import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
import { FrequenciaService } from '../../../../../../service/frequencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-frequencia-list',
  templateUrl: './frequencia-list.component.html',
  styleUrls: ['./frequencia-list.component.css']
})
export class FrequenciaListComponent implements OnInit {

  idEvento: number;

  frequencia: Frequencia = new Frequencia();

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: '#', width: 50 },
    { name: 'frequencia.inscricao.participante.nomeCracha', label: 'Inscricao', width: 200 },
    { name: 'frequencia.dataFrequencia', label: 'Data da Frequencia', width: 120, format: (value) => { return this.dateLayout(value) } },
    { name: 'frequencia.inscricao.codigoQrCode', label: 'Codigo de Inscricao', width: 120},
    { name: 'acoes', label: 'Ações', width: 280 },
  ];

  data = [];

  constructor(
    private frequenciaServive: FrequenciaService,
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
      this.getFrequenciaByEvento();
      this.frequencia.inscricao.evento.id = this.idEvento;
    })
  }

  getFrequenciaByEvento() {
    this.frequenciaServive.getFrequenciaByEvento(this.idEvento).subscribe(
      data => this.data = data
    );
  }

  excluirFrequenciaByEvento(id: number) {
    this._dialogService.openConfirm({
      message: 'Deseja excluir esta Frequencia do Evento ?',
      disableClose: true,
      title: 'Exclusão',
      cancelButton: 'Não',
      acceptButton: 'Sim',
    }).afterClosed().subscribe((aceitou: boolean) => {
      if (aceitou) {
        this.frequenciaServive.excluirFrequenciaByEvento(id)
          .subscribe(() => {
            this.getFrequenciaByEvento();
          })
      } else {
        console.log('Não aceitou excluir a Frequencia do evento');
      }
    })
  }


  public dateLayout(dt: any): String {
    return Moment(dt).format('DD/MM/YYYY [às] HH:mm:ss');
  }

}
