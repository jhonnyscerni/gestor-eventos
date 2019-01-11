import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../../../../../../domain/inscricao';
import { InscricaoService } from '../../../../../../service/inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Cracha } from '../../../../../../domain/cracha';
import { CrachaService } from '../../../../../../service/cracha.service';

@Component({
  selector: 'app-gerar-cracha',
  templateUrl: './gerar-cracha.component.html',
  styleUrls: ['./gerar-cracha.component.css']
})
export class GerarCrachaComponent implements OnInit {

  elementType = 'url';
  value: string ;
  // get values(): string[] {
  //   return this.value.split('\n');
  // }

  idInscricao: number;

  inscricao: Inscricao = new Inscricao();

  cracha: Cracha = new Cracha();
  
  idEvento: number;

  constructor(
    private inscricaoService: InscricaoService,
    private crachaService: CrachaService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idInscricao = this.route.snapshot.params['id'];

    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      this.processaCracha();
      this.cracha.evento.id = this.idEvento;
    });

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
