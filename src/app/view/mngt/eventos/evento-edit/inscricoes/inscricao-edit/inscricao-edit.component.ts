import { CategoriaParticipanteEvento } from './../../../../../../domain/categoria-participante-evento';
import { Participante } from './../../../../../../domain/participante';
import { ParticipanteService } from './../../../../../../service/participante.service';
import { InscricaoService } from './../../../../../../service/inscricao.service';
import { Inscricao } from './../../../../../../domain/inscricao';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { CategoriaParticipanteEventoService } from '../../../../../../service/categoria-participante-evento.service';

@Component({
  selector: 'app-inscricao-edit',
  templateUrl: './inscricao-edit.component.html',
  styleUrls: ['./inscricao-edit.component.css']
})
export class InscricaoEditComponent implements OnInit {

  isNew: boolean;

  idEvento: number;

  idInscricao: number;

  inscricao: Inscricao = new Inscricao();

  participantes: Participante[] = [];

  categoriaParticipanteEventos: CategoriaParticipanteEvento[] = [];

  constructor(
    private inscricaoService: InscricaoService,
    private participanteService: ParticipanteService,
    private categoriaParticipanteEventoService: CategoriaParticipanteEventoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.isNew = true;
    this.title.setTitle('Nova Inscricao');
    this.idInscricao = this.route.snapshot.params['id'];
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      this.carregarParticipantes();
      this.processaInscricao();
      this.getCategoriaParticipantesEvento();
      this.inscricao.evento.id = this.idEvento;
    });
  }

  /**
* Captura o id do Componente
*/
  processaInscricao() {
    if (this.idInscricao && !isNaN(this.idInscricao)) {
      this.editar();
    } else {//se id não informado
      //  this.criar();
      this.isNew = false;
    }
  }

  private editar() {
    this.inscricaoService.getInscricao(this.idInscricao).subscribe(inscricao => {
      this.inscricaoService.inscricao = inscricao;
      this.inscricao = this.inscricaoService.inscricao;
      this.atualizarTituloEdicao();
    });
  }

  onSubmit() {
    this.inscricaoService.salvar(this.inscricao, this.idEvento).subscribe(inscricao => {
      this.snackBar.open(`${inscricao.participante.nome} salvo com sucesso!`, '', { duration: 10000 });
    });

  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Incricao: ${this.inscricao.dtInscricao}`);
  }

  /**
  *Carregando Participantes
 */

  carregarParticipantes() {
    return this.participanteService.getParticipantes()
      .subscribe(participantes => this.participantes = participantes);
  }

  getCategoriaParticipantesEvento() {
    this.categoriaParticipanteEventoService.getCategoriaParticipantesEventoByEvento(this.idEvento)
      .subscribe(categoriaParticipanteEventos => this.categoriaParticipanteEventos = categoriaParticipanteEventos);
  }


  compareByOptionId(idFirst: CategoriaParticipanteEvento, idSecond: CategoriaParticipanteEvento): boolean {
    return idFirst && idSecond && idFirst.id === idSecond.id;
  }

  compareByOptionIdParticipante(idFirst: Participante, idSecond: Participante): boolean {
    return idFirst && idSecond && idFirst.id === idSecond.id;
  }

}
