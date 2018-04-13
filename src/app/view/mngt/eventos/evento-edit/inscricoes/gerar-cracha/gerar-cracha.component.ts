import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../../../../../../domain/inscricao';
import { InscricaoService } from '../../../../../../service/inscricao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

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

  constructor(
    private inscricaoService: InscricaoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Inscricao');
    this.idInscricao = this.route.snapshot.params['id'];
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


}
