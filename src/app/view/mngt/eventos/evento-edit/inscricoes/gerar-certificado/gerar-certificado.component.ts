import { Certificado } from './../../../../../../domain/certificado';
import { CertificadoService } from './../../../../../../service/certificado.service';
import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../../../../../../domain/inscricao';
import { InscricaoService } from '../../../../../../service/inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-gerar-certificado',
  templateUrl: './gerar-certificado.component.html',
  styleUrls: ['./gerar-certificado.component.css']
})
export class GerarCertificadoComponent implements OnInit {

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
    this.idInscricao = this.route.snapshot.params['id'];
      this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      this.processaCertificado();
      console.log(`id de evento em Facilitador : ` + this.idEvento);
      this.certificado.evento.id = this.idEvento;
    });
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
            this.certificado = certificado;
          });
        this.atualizarTituloCertificado();
      })

  }
  


  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.write(`
      <html>
        <head>
          <style>
          .page-preview {
            background-color: rgb(204,204,204) !important;
            padding: 20px;
            width: auto;
        }
        
        #page-certificado {
            background: url(/assets/imagens/modelo_certificado.jpg) no-repeat center center;
        }
        
        #page-certificado .codigoValidacao {
            top: -30px;
            position: relative;
            text-align: right;
            right: -50px;
        }
        
        #page-certificado .texto {
            margin: 120px 10px 10px 10px;
            overflow: hidden;
            padding: 0 85px 85px 85px;
            text-align: justify;
        }
        
        
        #page-certificado {
            display: block!important;
            margin: 0!important;
            margin-bottom: 0.5cm!important;
            box-shadow: 0 0 0.5cm rgba(0,0,0,0.8)!important;
            background-color: #FFF!important;
            -webkit-background-size: cover!important;
            -moz-background-size: cover!important;
            -o-background-size: cover!important;
            background-size: cover!important;
            box-sizing: border-box!important;
            padding: 35px!important;
            background-origin: content-box!important;
            width: 29.7cm!important;
            height: 21cm!important;
        }
        
        @media only screen and (max-width: 1600px) and (min-width: 1301px){
        #page-certificado {
            zoom: 0.80;
            -moz-zoom: 0.75;
            -moz-transform: scale(0.75,0.75);
            -moz-transform-origin: left top;
        }
        }
        
        div.actions ul {
            overflow: hidden;
            padding: 0 !important;
        }
        
        div.actions ul li {
            float: left;
            list-style: none outside none;
            margin: 0 2px 5px 0;
            padding: 0;
        }
        
        div.actions {
            margin-top: 0;
            padding-right: 20px;
        }
        
        
        .info {
            padding-top: 20px;
        }
        
        .info p {
            color:#656565;
            font-size: 12px;
            display: block;
        
        }
        
        .green {
            background-color: #5BB75B;
            background-repeat: repeat-x;
            border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
            color: #FFFFFF;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        }
        
        .cinza {
            background-color: #656565;
            background-repeat: repeat-x;
            border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
            color: #FFFFFF;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        }
        
        
          </style>
        </head>
    <body onload="window.print()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
