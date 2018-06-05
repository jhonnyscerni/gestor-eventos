import { AssinaturaService } from './../../../../../../../service/assinatura.service';
import { Assinatura } from './../../../../../../../domain/assinatura';
import { Component, OnInit } from '@angular/core';
import { Certificado } from '../../../../../../../domain/certificado';
import { Router, ActivatedRoute } from '@angular/router';
import { CertificadoService } from '../../../../../../../service/certificado.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { Inscricao } from '../../../../../../../domain/inscricao';

@Component({
  selector: 'app-certificado-participante-edit',
  templateUrl: './certificado-participante-edit.component.html',
  styleUrls: ['./certificado-participante-edit.component.css']
})
export class CertificadoParticipanteEditComponent implements OnInit {

  isNew: boolean;

  idEvento: number;

  idCertificado: number;

  certificado: Certificado = new Certificado();

  inscricao: Inscricao = new Inscricao();

  defaultBodyValue: string = "";

  assinaturas: Assinatura[] = [];

  constructor(
    private assinaturaService: AssinaturaService,
    private certificadoService: CertificadoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,

  ) { }

  nome: any;
  evento: any;
  local: any;
  dataInicio: any;
  dataFim: any;
  cargaHoraria: any;

  ngOnInit() {

    this.nome = "{nome}";
    this.evento = "{evento}";
    this.local = "{local}";
    this.dataInicio = "{dataInicio}";
    this.dataFim = "{dataFim}";
    this.cargaHoraria = "{cargaHoraria}";
    this.isNew = true;
    this.title.setTitle('Novo Certificado');
    this.idCertificado = this.route.snapshot.params['id'];
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      this.processaCertificado();
      this.getAssinaturas();
      this.certificado.evento.id = this.idEvento;
    });
  }

  getAssinaturas() {
    return this.assinaturaService.getAssinaturas().subscribe(
      assinatura => this.assinaturas = assinatura
    )
  }

  /**
* Captura o id do Componente
*/
  processaCertificado() {
    if (this.idCertificado && !isNaN(this.idCertificado)) {
      this.editar();
    } else {//se id não informado
      //  this.criar();
      this.isNew = false;
    }
  }


  private editar() {
    this.certificadoService.getCertificado(this.idCertificado).subscribe(certificado => {
      this.certificadoService.certificado = certificado;
      this.certificado = this.certificadoService.certificado;
      this.defaultBodyValue = certificado.conteudoCertificado;
      this.atualizarTituloEdicao();
    });
  }


  onSubmit() {

    this.certificadoService.salvar(this.certificado, this.idEvento).subscribe(certificado => {
      this.snackBar.open(`Modelo Certificado salvo com sucesso!`, '', { duration: 10000 });
      this.router.navigate(['adm','evento','edit', this.idEvento, 'certificado-participante', certificado.id]);
    });

  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Certificado: ${this.certificado.id}`);
  }


  onBodyTextEditorKeyUp(textValue) {

    //console.log(textValue);
    this.certificado.conteudoCertificado = textValue;
  }

  compareByOptionId(idFirst: Assinatura, idSecond: Assinatura): boolean {
    return idFirst && idSecond && idFirst.id === idSecond.id;
  }


}
