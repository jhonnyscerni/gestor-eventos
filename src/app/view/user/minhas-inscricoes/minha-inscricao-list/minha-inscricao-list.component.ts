import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Inscricao } from '../../../../domain/inscricao';
import { InscricaoService } from '../../../../service/inscricao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { ParticipanteService } from '../../../../service/participante.service';
import { Page } from '../../../../@core/model/page';
import { Participante } from '../../../../domain/participante';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */

@Component({
  selector: 'app-minha-inscricao-list',
  templateUrl: './minha-inscricao-list.component.html',
  styleUrls: ['./minha-inscricao-list.component.css']
})
export class MinhaInscricaoListComponent implements OnInit {

  idEvento: number;

  inscricaoPage: Inscricao[] = [];

  participanteLogado: any;

  constructor(
    public participanteServive: ParticipanteService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService
  ) {
   }

  ngOnInit() {
    this.title.setTitle('Minhas Inscrições');
     this.participanteServive.getParticipanteLogado().subscribe(participante=>{
      this.participanteLogado = participante;
      this.getInscricoesDoParticipante();
    });

    // this.participanteLogado = this.participanteServive.getParticipanteLogado();
    // console.log("Construtor");
    // console.log(this.participanteServive.participante);

  }

  getInscricoesDoParticipante() {
    this.participanteServive.getInscricoesByParticipante(this.participanteLogado.id).subscribe(page => {
      this.inscricaoPage = page;
    })
  }

  public dateLayout(dt: any): String {
    return Moment(dt).format('dddd, DD [de] MMMM [de] YYYY [às] HH:mm:ss');
}


}
