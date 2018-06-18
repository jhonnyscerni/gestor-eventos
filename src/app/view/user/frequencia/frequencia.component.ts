import { Component, OnInit } from '@angular/core';
import { Frequencia } from '../../../domain/frequencia';
import { FrequenciaService } from '../../../service/frequencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import * as Moment from 'moment'; /*  biblioteca de formatação de data/hora */

@Component({
  selector: 'app-frequencia',
  templateUrl: './frequencia.component.html',
  styleUrls: ['./frequencia.component.css']
})
export class FrequenciaComponent implements OnInit {

  idEvento: number;

  idInscricao: number;

  frequencia: Frequencia = new Frequencia();

  data = [];

  constructor(
    private frequenciaServive: FrequenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Frequencia');
    this.idInscricao = this.route.snapshot.params['idInscricao'];
    this.idEvento = this.route.snapshot.params['idEvento'];
    this.getFrequenciaByEvento();
    this.frequencia.inscricao.evento.id = this.idEvento;
  }

  getFrequenciaByEvento() {
    this.frequenciaServive.getFrequenciaByEventoByInscricao(this.idEvento, this.idInscricao).subscribe(
      data => this.data = data
    );
  }

  public dateLayout(dt: any): String {
    return Moment(dt).format('DD/MM/YYYY [às] HH:mm:ss');
  }


}
