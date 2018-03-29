import { Observable } from 'rxjs/Rx';
import { Evento } from './../../../../../domain/evento';
import { CategoriaParticipanteEventoService } from './../../../../../service/categoria-participante-evento.service';
import { CategoriaParticipanteEvento } from './../../../../../domain/categoria-participante-evento';
import { CategoriaParticipanteService } from './../../../../../service/categoria-participante.service';
import { CategoriaParticipante } from './../../../../../domain/categoria-participante';
import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-categoria-participante',
  templateUrl: './categoria-participante.component.html',
  styleUrls: ['./categoria-participante.component.css']
})
export class CategoriaParticipanteComponent implements OnInit {

  categoriaParticipantes: CategoriaParticipante[] = [];

  categoriaParticipanteEvento: CategoriaParticipanteEvento = new CategoriaParticipanteEvento();

  evento: Evento = new Evento();

  idEvento: number;

  idCategoriaParticipanteEvento: number;

  q: number;

  isNew: boolean;

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: '#', width: 50 },
    { name: 'categoriaParticipante.titulo', label: 'Categoria', width: 600 },
    { name: 'vagas', label: 'Vagas', width: 100 },
    { name: 'acoes', label: 'Ações', width: 250 },
  ];

  data = [];


  constructor(
    private categoriaParticipanteService: CategoriaParticipanteService,
    private categoriaParticipanteEventoService: CategoriaParticipanteEventoService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.isNew = true;
    this.title.setTitle('Novo Categoria Participante Evento');
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      console.log(this.idEvento);
      this.carregaCategoriaParticipantes();
      this.getCategoriaParticipantesEvento();
      this.evento.id = this.idEvento;
    });
  }

  getCategoriaParticipantesEvento() {
    this.categoriaParticipanteEventoService.getCategoriaParticipantesEventoByEvento(this.idEvento)
      .subscribe(data => this.data = data);
  }

  /**
 *Carregando CategoriaParticipante
*/

  carregaCategoriaParticipantes() {
    this.categoriaParticipanteService.getCategoriaParticipantes()
      .subscribe(categoriaParticipantes => this.categoriaParticipantes = categoriaParticipantes);
  }

  /**
     * Preparo para edição
     */

  onSubmit() {
    this.categoriaParticipanteEvento.evento = this.evento;
    this.categoriaParticipanteEventoService.salvar(this.categoriaParticipanteEvento, this.idEvento)
      .subscribe(categoriaParticipanteEvento => {
        this.getCategoriaParticipantesEvento();
        this.snackBar.open(`Categoria Participante Evento: ${categoriaParticipanteEvento.categoriaParticipante.titulo}
         salvo com sucesso!`, '', { duration: 10000 });
      });

  }

  voltar() {
    this.router.navigate(['eventos'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categoria Participante Evento: ${this.categoriaParticipanteEvento.categoriaParticipante.titulo}`);
  }


  excluirCategoriaParticipanteEvento(id: number) {
    this._dialogService.openConfirm({
      message: 'Deseja excluir essa Categoria Participante Evento ?',
      disableClose: true,
      title: 'Exclusão',
      cancelButton: 'Não',
      acceptButton: 'Sim',
    }).afterClosed().subscribe((aceitou: boolean) => {
      if (aceitou) {
        this.categoriaParticipanteEventoService.excluirCategoriaParticipanteEvento(id)
          .subscribe(() => {
            this.getCategoriaParticipantesEvento();
          })
      } else {
        console.log('Não aceitou excluir o categoria participante evento');
      }
    })
  }

}