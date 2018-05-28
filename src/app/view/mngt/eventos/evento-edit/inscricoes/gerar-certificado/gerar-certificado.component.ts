import { Certificado } from './../../../../../../domain/certificado';
import { CertificadoService } from './../../../../../../service/certificado.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Inscricao } from '../../../../../../domain/inscricao';
import { InscricaoService } from '../../../../../../service/inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */
import * as jsPDF from 'jspdf';

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

  value: string ;
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
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{evento}", this.inscricao.evento.nome);
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{local}", this.inscricao.evento.local);
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{dataInicio}", Moment(this.inscricao.evento.inicioEvento).format('DD [de] MMMM [de] YYYY'));
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{dataFim}", Moment(this.inscricao.evento.fimEvento).format('DD [de] MMMM [de] YYYY'));
          certificado.conteudoCertificado = certificado.conteudoCertificado.replace("{cargaHoraria}", this.inscricao.evento.cargaHoraria);
          this.certificado = certificado;
          this.value = this.inscricao.codigoQrCode;
        });
        this.atualizarTituloCertificado();
      })

  }

  @ViewChild('content') content: ElementRef;
  print(): void {

    let doc = new jsPDF("l", "mm", [297, 210]);

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
   // let content = this.content.nativeElement;

    let imgData = 'data:image/jpeg;base64,'+ this.certificado.imagem ;

    let content = document.getElementById("content").innerHTML;

    doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);
    doc.fromHTML(content, 35, 70, {
      'width': 230 ,
      'elementHandlers': specialElementHandlers
    });

    doc.text('DESEMBARGADORA CÉLIA REGINA DE LIMA PINHEIRO', 75, 160);
    doc.text('Diretora da Escola Judiciária Eleitoral', 105, 170);

    doc.setFontSize(8)
    doc.text('Validar em http://www.tre-pa.jus.br com o código de autenticação: [' +this.inscricao.codigoQrCode+ ']', 140, 190);

    doc.save('certificado - '+this.inscricao.participante.nome+".pdf");
  }

}
