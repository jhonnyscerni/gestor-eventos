import { Component, OnInit } from '@angular/core';
import { InscricaoService } from '../../../service/inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Inscricao } from '../../../domain/inscricao';

@Component({
  selector: 'app-meu-cracha',
  templateUrl: './meu-cracha.component.html',
  styleUrls: ['./meu-cracha.component.css']
})
export class MeuCrachaComponent implements OnInit {

  participanteLogado: any;

  inscricao: Inscricao = new Inscricao();

  idInscricao: number;
  value: string ;

  elementType = 'url';

  constructor(
    private inscricaoService: InscricaoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idInscricao = this.route.snapshot.params['idInscricao'];
    this.processaCracha();
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
          <title>Sistema Seven - Imprimir Crachá </title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
