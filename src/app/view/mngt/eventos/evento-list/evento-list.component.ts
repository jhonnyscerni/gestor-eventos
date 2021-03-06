import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../@core/model/page';
import { Evento } from '../../../../domain/evento';
import { Title } from '@angular/platform-browser';
import { EventoService } from '../../../../service/evento.service';
import { Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
import { EventoFiltro } from '../../../../domain/evento-filtro';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent implements OnInit {

  eventoPage: Page<Evento> = new Page<Evento>();

  filtro = new EventoFiltro();

  constructor(
    private _titleService: Title,
    private eventoService: EventoService,
    private router: Router,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this._titleService.setTitle( 'Siberius' );

    this.eventoService.getEventos().subscribe(page => {
      this.eventoPage = page;
    })
  }

  excluirEvento(id: number) {
    this._dialogService.openConfirm({
      message: 'Deseja excluir esse Evento ?',
      disableClose: true,
      title: 'Exclusão',
      cancelButton: 'Não',
      acceptButton: 'Sim',
    }).afterClosed().subscribe((aceitou: boolean) => {
      if (aceitou) {
        this.eventoService.excluirEvento(id)
            .subscribe(() => {
              this.getEventos();
            })
      } else {
        console.log('Não aceitou excluir o evento');
      }
    })
  }

  getEventos() {
    this.eventoService.getEventos().subscribe(page => {
      this.eventoPage = page;
    })
  }

  getEventosPorNome(nome: String) {
    this.eventoService.getEventosPorNome(nome).subscribe(page => {
      this.eventoPage = page;
    })
  }

  public dateLayout(dt: any): String {
    return Moment(dt).format('dddd, DD [de] MMMM [de] YYYY [às] HH:mm:ss');
}

public pesquisaDescritiva(nome: String): void {
  if (nome == '') {
    this.getEventos();
  } else {
    this.getEventosPorNome(nome);
  }
}


}
