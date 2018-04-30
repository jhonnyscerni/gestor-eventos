import { Component, OnInit } from '@angular/core';
import { Certificado } from '../../../../../../../domain/certificado';
import { Router, ActivatedRoute } from '@angular/router';
import { CertificadoService } from '../../../../../../../service/certificado.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

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

  constructor(
    private certificadoService: CertificadoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }



  ngOnInit() {
    this.isNew = true;
    this.title.setTitle('Novo Certificado');
    this.idCertificado = this.route.snapshot.params['id'];
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      this.processaCertificado();
      this.certificado.evento.id = this.idEvento;
    });
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
  this.certificadoService.getCertificado(this.idCertificado).subscribe( certificado => {
    this.certificadoService.certificado = certificado;
    this.certificado = this.certificadoService.certificado;
    this.atualizarTituloEdicao();
  });
}


onSubmit() {
  
  this.certificadoService.salvar(this.certificado, this.idEvento).subscribe(certificado => {
    this.snackBar.open(`${certificado.id} salvo com sucesso!`, '', { duration: 10000 });
    this.router.navigate(['certificado', certificado.id]);
  });

}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Certificado: ${this.certificado.id}`);
}


  onBodyTextEditorKeyUp(textValue) {

    this.certificado.conteudo = textValue;
  }

}
