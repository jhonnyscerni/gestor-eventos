import { Component, OnInit } from '@angular/core';
import { Inscricao } from '../../../../domain/inscricao';
import { CategoriaParticipanteEvento } from '../../../../domain/categoria-participante-evento';
import { InscricaoService } from '../../../../service/inscricao.service';
import { CategoriaParticipanteEventoService } from '../../../../service/categoria-participante-evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { ParticipanteService } from '../../../../service/participante.service';
import { Evento } from '../../../../domain/evento';
import { EventoService } from '../../../../service/evento.service';

@Component({
  selector: 'app-minha-inscricao-edit',
  templateUrl: './minha-inscricao-edit.component.html',
  styleUrls: ['./minha-inscricao-edit.component.css']
})
export class MinhaInscricaoEditComponent implements OnInit {

  isNew: boolean;

  verificaInscricaoParticipante: number;

  idEvento: number;

  idInscricao: number;

  idInscricaoComprovante: number;

  inscricao: Inscricao = new Inscricao();


  categoriaParticipanteEventos: CategoriaParticipanteEvento[] = [];

  participanteLogado: any;

  evento: Evento = new Evento();


  constructor(
    public participanteServive: ParticipanteService,
    private inscricaoService: InscricaoService,
    private eventoService: EventoService,
    private categoriaParticipanteEventoService: CategoriaParticipanteEventoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {


    this.isNew = true;
    this.title.setTitle('Nova Inscricao');
    this.idInscricao = this.route.snapshot.params['idInscricao'];
    this.idEvento = this.route.snapshot.params['idEvento'];
    this.processaInscricao();
    this.getCategoriaParticipantesEvento();
    this.getEvento();
    this.participanteServive.getParticipanteLogado().subscribe(participante => {
      this.participanteLogado = participante;
      this.inscricao.participante = this.participanteLogado;
    });

    this.inscricao.evento.id = this.idEvento;
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

    this.participanteServive.getParticipanteLogado().subscribe(participante => {
      this.participanteLogado = participante;
      this.inscricao.participante = this.participanteLogado;
      this.inscricaoService.getVerificaInscricaoParticipanteLogado(this.inscricao.participante.id, this.idEvento).subscribe(
        verificaInscricaoParticipante => {
          console.log(verificaInscricaoParticipante);

          if(verificaInscricaoParticipante > 0){
            this.snackBar.open(`Sua Inscrição neste evento ja foi realizada!`, '', { duration: 10000 });
          }else {
            this.inscricaoService.salvar(this.inscricao, this.idEvento).subscribe(inscricao => {
              console.log(inscricao.id);
              this.snackBar.open(`${inscricao.participante.nome} salvo com sucesso!`, '', { duration: 10000 });
              this.router.navigate(['evento', this.idEvento, 'minha-inscricao', inscricao.id, 'comprovante']);
              // this.router.navigate(['/']);
            });
      
             
          }
        } 
        )
    });
    


  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Incricao: ${this.inscricao.dtInscricao}`);
  }

  getCategoriaParticipantesEvento() {
    this.categoriaParticipanteEventoService.getCategoriaParticipantesEventoByEvento(this.idEvento)
      .subscribe(categoriaParticipanteEventos => this.categoriaParticipanteEventos = categoriaParticipanteEventos);
  }


  compareByOptionId(idFirst: CategoriaParticipanteEvento, idSecond: CategoriaParticipanteEvento): boolean {
    return idFirst && idSecond && idFirst.id === idSecond.id;
  }

  getEvento() {
    this.eventoService.getEvento(this.idEvento).subscribe(evento => this.evento = evento);
  }


}
