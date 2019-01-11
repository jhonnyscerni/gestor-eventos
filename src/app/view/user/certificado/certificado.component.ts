import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Inscricao } from '../../../domain/inscricao';
import { Certificado } from '../../../domain/certificado';
import { InscricaoService } from '../../../service/inscricao.service';
import { CertificadoService } from '../../../service/certificado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  idInscricao: number;


  idEvento: number;

  inscricao: Inscricao = new Inscricao();

  certificado: Certificado = new Certificado();

  constructor(
    private inscricaoService: InscricaoService,
    private certificadoService: CertificadoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idInscricao = this.route.snapshot.params['idInscricao'];
    this.idEvento = this.route.snapshot.params['idEvento'];
    this.processaCertificado();
    this.certificado.evento.id = this.idEvento;
  }

  getCertificado() {
    return this.certificadoService.getCertificadoByEvento(this.idEvento);
}

atualizarTituloCertificado() {
  this.title.setTitle(`Gerando Certificado : ${this.inscricao.participante.nome}`);
}

processaCertificado() {
  return this.inscricaoService.getCertificadoByInscricaoByParticpanteByEvento(this.idInscricao)
    .subscribe(inscricao => {
      this.inscricaoService.inscricao = inscricao;
      this.inscricao = this.inscricaoService.inscricao;
      this.getCertificado().subscribe(certificado => {
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{nome}", this.inscricao.participante.nome);
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{evento}", this.inscricao.evento.nome);
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{local}", this.inscricao.evento.local);
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{dataInicio}", Moment(this.inscricao.evento.inicioEvento).format('DD [de] MMMM [de] YYYY'));
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{dataFim}", Moment(this.inscricao.evento.fimEvento).format('DD [de] MMMM [de] YYYY'));
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{cargaHoraria}", this.inscricao.evento.cargaHoraria);
          this.certificado = certificado;
        });
      this.atualizarTituloCertificado();
    })

}

public dateLayout(dt: any): String {
  return Moment(dt).format('DD [de] MMMM [de] YYYY [às] HH:mm:ss');
}

@ViewChild('conteudoCertificado') conteudoCertificado: ElementRef;
  print(): void {

    var img = new Image();
    img.src = this.certificado.imagem;
    img.addEventListener('load', () => {
      var canvas = document.createElement("canvas");

      var dataURL = canvas.toDataURL("image/jpeg");
    })

    let imgData = img.src;

    var img2 = new Image();
    img2.src = this.certificado.assinatura.assinatura;
    img2.addEventListener('load', () => {
      var canvas = document.createElement("canvas");

      var dataURL = canvas.toDataURL("image/png");
    })

    let imgData2 = img2.src;


    let doc = new jsPDF("l", "mm", [297, 210]);

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    //let content = this.content.nativeElement;


    let content = document.getElementById("conteudoCertificado").innerHTML;

    if (this.certificado.imagem) {
      doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);
    }

    doc.addImage(imgData2, 'PNG', 110, 140, 85, 20);

    doc.fromHTML(content, 35, 45, {
      'width': 230,
      'elementHandlers': specialElementHandlers
    });

    doc.text(this.certificado.assinatura.assinante, 75, 160);
    doc.text(this.certificado.assinatura.cargo, 105, 170);

    doc.setFontSize(8)
    doc.text('Validar em http://www.siberius.com.br com o código de autenticação: [' + this.inscricao.codigoQrCode + ']', 140, 190);

    doc.save('certificado - ' + this.inscricao.participante.nome + ".pdf");
  }

  // OUTRA OPCAO DE IMPRESSAO DE CERTIFICADO 

  // print(): void {
  //       let printContents, popupWin;
  //       printContents = document.getElementById('print-section').innerHTML;
  //       popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //       popupWin.document.write(`
  //         <html>
  //           <head>
  //           <style>
  //           .page-preview {
  //             background-color: rgb(204,204,204) !important;
  //             width: auto;
  //         }

  //         #page-certificado-texto {
  //             display: block!important;
  //             margin: 0!important;
  //             background-color:transparent!important;
  //             -webkit-background-size: cover!important;
  //             -moz-background-size: cover!important;
  //             -o-background-size: cover!important;
  //             /* background-size: cover!important; */
  //             box-sizing: border-box!important;
  //             /* background-origin: content-box!important; */
  //             width: 29.7cm!important;
  //         }

  //         #page-certificado-texto .texto {
  //             margin: -720px 10px 10px 10px;
  //             overflow: hidden;
  //             padding: 0 85px 85px 85px;
  //             text-align: justify;
  //         }


  //         #page-certificado {
  //             display: block!important;
  //             margin: 0!important;
  //             background-color: #FFF!important;
  //             -webkit-background-size: cover!important;
  //             -moz-background-size: cover!important;
  //             -o-background-size: cover!important;
  //             /* background-size: cover!important; */
  //             box-sizing: border-box!important;
  //             /* background-origin: content-box!important; */
  //             width: 29.7cm!important;
  //             height: 20.9cm!important;
  //         }

  //         @media only screen and (max-width: 1600px) and (min-width: 1301px){
  //         #page-certificado {
  //             zoom: 0.80;
  //             -moz-zoom: 0.75;
  //             -moz-transform: scale(0.75,0.75);
  //             -moz-transform-origin: left top;
  //         }
  //         #page-certificado-texto {
  //             zoom: 0.80;
  //             -moz-zoom: 0.75;
  //             -moz-transform: scale(0.75,0.75);
  //             -moz-transform-origin: left top;
  //         }
  //         }

  //         div.actions ul {
  //             overflow: hidden;
  //             padding: 0 !important;
  //         }

  //         div.actions ul li {
  //             float: left;
  //             list-style: none outside none;
  //             margin: 0 2px 5px 0;
  //             padding: 0;
  //         }

  //         div.actions {
  //             margin-top: 0;
  //             padding-right: 20px;
  //         }


  //         .info {
  //             padding-top: 20px;
  //         }

  //         .info p {
  //             color:#656565;
  //             font-size: 12px;
  //             display: block;

  //         }

  //         .green {
  //             background-color: #5BB75B;
  //             background-repeat: repeat-x;
  //             border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  //             color: #FFFFFF;
  //             text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  //         }

  //         .cinza {
  //             background-color: #656565;
  //             background-repeat: repeat-x;
  //             border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  //             color: #FFFFFF;
  //             text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  //         }


  //             </style>
  //           </head>
  //       <body onload="window.print()">${printContents}</body>
  //         </html>`
  //       );
  //       popupWin.document.close();

  // }
}
