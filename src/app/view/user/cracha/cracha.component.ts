import { CrachaService } from './../../../service/cracha.service';
import { Participante } from './../../../domain/participante';
import { Component, OnInit } from '@angular/core';
import { InscricaoService } from '../../../service/inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Inscricao } from '../../../domain/inscricao';
import { Cracha } from '../../../domain/cracha';

@Component({
  selector: 'app-cracha',
  templateUrl: './cracha.component.html',
  styleUrls: ['./cracha.component.css']
})
export class CrachaComponent implements OnInit {

  participanteLogado: Participante = new Participante();

  idEvento: number;

  inscricao: Inscricao = new Inscricao();

  cracha: Cracha = new Cracha();

  idInscricao: number;

  value: string;

  elementType = 'url';

  constructor(
    private inscricaoService: InscricaoService,
    private crachaService: CrachaService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idInscricao = this.route.snapshot.params['idInscricao'];
    this.idEvento = this.route.snapshot.params['idEvento'];
    this.processaCracha();
    this.cracha.evento.id = this.idEvento;
  }

  getCracha() {
    return this.crachaService.getCrachaByEvento(this.idEvento);
}

  atualizarTituloGerarCracha() {
    this.title.setTitle(`Gerando Cracha de : ${this.inscricao.participante.nome}`);
  }


  processaCracha() {
    return this.inscricaoService.getParticpanteByInscricao(this.idInscricao)
      .subscribe(inscricao => {
        this.inscricaoService.inscricao = inscricao;
        this.inscricao = this.inscricaoService.inscricao;
        this.value = this.inscricao.codigoQrCode;
        this.getCracha().subscribe(cracha => {
          this.cracha = cracha;
        });
        this.atualizarTituloGerarCracha();
      })

  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
    
          <title>Sistema Siberius - Imprimir Crachá </title>
          <style>
          .content_print { 
            width: 50%;
            align-items: center;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
        .nomeParticipante {
          margin-top: 8% !important;
          text-align: center;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 20px;
          font-weight: bold;
          text-transform: uppercase;
      }
      .instituicaoOrigem {
        margin-bottom: 8% !important;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
    }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
