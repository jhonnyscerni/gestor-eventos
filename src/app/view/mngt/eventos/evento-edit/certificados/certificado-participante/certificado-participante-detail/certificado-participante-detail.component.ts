import { Component, OnInit } from '@angular/core';
import { Certificado } from '../../../../../../../domain/certificado';
import { CertificadoService } from '../../../../../../../service/certificado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-certificado-participante-detail',
  templateUrl: './certificado-participante-detail.component.html',
  styleUrls: ['./certificado-participante-detail.component.css']
})
export class CertificadoParticipanteDetailComponent implements OnInit {

  isNew: boolean;

  idEvento: number;

  idCertificado: number;

  certificado: Certificado = new Certificado();

  constructor(
    private certificadoService: CertificadoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Inscricao');
    this.idCertificado = this.route.snapshot.params['id'];
    this.processaCertificado();
  }


  atualizarTituloGerarCracha() {
    this.title.setTitle(`Gerando Certificado de : ${this.certificado.evento.nome}`);
  }

  atualizarPagina(){
    if(this.certificado) {
      this.router.navigate(['certificado','novo']);
    }
  }

  processaCertificado() {
    return this.certificadoService.getCertificado(this.idCertificado)
      .subscribe(certificado => {
        this.certificadoService.certificado = certificado;
        this.certificado = this.certificadoService.certificado;
        this.atualizarTituloGerarCracha();
      })

  }

}
