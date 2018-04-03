import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../../domain/evento';
import { TipoEvento } from '../../../../domain/tipo-evento';
import { EventoService } from '../../../../service/evento.service';
import { DateTimeService } from '../../../../@core/util/date-time.service';
import { TipoEventoService } from '../../../../service/tipo-evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  idEvento: number;

  q: number;

  evento: Evento = new Evento();

  tipoEventos: TipoEvento[] = [];

  isNew: boolean;

  constructor(
    private eventoService: EventoService,
    public dtService: DateTimeService,
    private tipoEventoService: TipoEventoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService,
  ) { }

  /* EDU: validação customizada do formulário, relacionada às datas do evento */
  // verifica se a data de início das inscrições é maior ou igual à data de fim das inscrições
  isSubscriptionStartConflicsWithSubscriptionEnd(): Boolean {
    if (!this.evento.inicioInscricao || !this.evento.fimInscricao) { return false; }
    if (this.dtService.isAfterOrEqual(this.evento.inicioInscricao, this.evento.fimInscricao)) { return true; }
    return false; // validação não encontrou erro
  }
  // verifica se a data de início do evento é maior ou igual à data de fim do evento
  isEventStartConflicsWithEventEnd(): Boolean {
    if (!this.evento.inicioEvento || !this.evento.fimEvento) { return false; }
    if (this.dtService.isAfterOrEqual(this.evento.inicioEvento, this.evento.fimEvento)) { return true; }
    return false; // validação não encontrou erro
  }
  // verifica se a data de fim das inscrições é maior que a data de fim do evento
  isSubscriptionEndConflicsWithEventEnd(): Boolean {
    if (!this.evento.fimInscricao || !this.evento.fimEvento) { return false; }
    if (this.dtService.isAfterOrEqual(this.evento.fimInscricao, this.evento.fimEvento)) { return true; }
    return false; // validação não encontrou erro
  }
  // verifica se a data de início do evento é menor que a data de início das inscrições
  isSubscriptionStartConflicsWithEventStart(): Boolean {
    if (!this.evento.inicioEvento || !this.evento.inicioInscricao) { return false; }
    if (this.dtService.isBeforeOrEqual(this.evento.inicioEvento, this.evento.inicioInscricao)) { return true; }
    return false; // validação não encontrou erro
  }


  ngOnInit() {
    this.isNew = true;
    this.title.setTitle('Novo Evento');
    //this.id = this.route.snapshot.params['id'];

    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      console.log(this.idEvento);

      this.processaEvento();
      this.carregarTipoEvento();
      this.evento.id = this.idEvento;
    });

  }

  /**
  *Carregando Tipo Evento
 */

  carregarTipoEvento() {
    return this.tipoEventoService.getTipoEventos()
      .subscribe(tipoEventos => this.tipoEventos = tipoEventos);
  }

  /**
  * Captura o id do Pessoa
  */
  processaEvento() {
    if (this.idEvento && !isNaN(this.idEvento)) {
      this.editar();
    } else {//se id não informado
      this.isNew = false;
    }
  }
  /**
     * Preparo para edição
     */
  private editar() {
    this.isNew = false;

    this.eventoService.getEvento(this.idEvento).subscribe(evento => {
      this.eventoService.evento = evento;
      this.evento = this.eventoService.evento;
      this.atualizarTituloEdicao();
    });

  }


  onSubmit() {

    this.eventoService.salvar(this.evento).subscribe(evento => {
      // this.router.navigate(['/evento/edit', evento.id]);
      this.snackBar.open(`${evento.nome} salvo com sucesso!`, '', { duration: 10000 });
    });

  }

  voltar() {
    this.router.navigate(['eventos'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Evento: ${this.evento.descricao}`);
  }


}
