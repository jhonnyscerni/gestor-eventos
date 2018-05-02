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

  inscricao: Inscricao = new Inscricao();

  constructor(
    private inscricaoService: InscricaoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idInscricao = this.route.snapshot.params['id'];
    this.processaCertificado();
  }


  atualizarTituloCertificado() {
    this.title.setTitle(`Gerando Certificado : ${this.inscricao.participante.nome}`);
  }

  processaCertificado() {
    return this.inscricaoService.getCertificadoByInscricaoByParticpanteByEvento(this.idInscricao)
      .subscribe(inscricao => {
        this.inscricaoService.inscricao = inscricao;
        this.inscricao = this.inscricaoService.inscricao;
        this.atualizarTituloCertificado();
      })

  }

}
