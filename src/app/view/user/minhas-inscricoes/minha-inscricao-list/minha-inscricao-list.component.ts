import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../../../../domain/inscricao';
import { InscricaoService } from '../../../../service/inscricao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import { ParticipanteService } from '../../../../service/participante.service';
import { Page } from '../../../../@core/model/page';
import { Participante } from '../../../../domain/participante';

@Component({
  selector: 'app-minha-inscricao-list',
  templateUrl: './minha-inscricao-list.component.html',
  styleUrls: ['./minha-inscricao-list.component.css']
})
export class MinhaInscricaoListComponent implements OnInit {

  idEvento: number;

  inscricaoPage: Page<Inscricao> = new Page<Inscricao>();

  participanteLogado: Participante = new Participante()

  constructor(
    private participanteServive: ParticipanteService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.title.setTitle('Minhas Inscrições');
    this.participanteLogado = this.participanteServive.getParticipanteLogado();
    console.log("-------->"+this.participanteLogado);
  }

  // getInscricoesDoParticipante() {
  //   this.participanteServive.getInscricoesByParticipante(this.participanteLogado.id).subscribe(page => {
  //     this.inscricaoPage = page;
  //   })
  // }

}
