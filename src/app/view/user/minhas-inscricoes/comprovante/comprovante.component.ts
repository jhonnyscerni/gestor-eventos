import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InscricaoService } from '../../../../service/inscricao.service';
import { Inscricao } from '../../../../domain/inscricao';


import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.css']
})
export class ComprovanteComponent implements OnInit {

  idInscricao: number;

  inscricao: Inscricao = new Inscricao();


  constructor(
    private inscricaoService: InscricaoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {

    this.title.setTitle('Comprovante');
    this.idInscricao = this.route.snapshot.params['idInscricao'];
    this.getInscricao();
  }

  private getInscricao() {
    this.inscricaoService.getInscricao(this.idInscricao).subscribe(inscricao => {
      this.inscricaoService.inscricao = inscricao;
      this.inscricao = this.inscricaoService.inscricao;
    });
  }

  public dateLayout(dt: any): String {
    return Moment(dt).format('dddd, DD [de] MMMM [de] YYYY [às] HH:mm:ss');
}


}
