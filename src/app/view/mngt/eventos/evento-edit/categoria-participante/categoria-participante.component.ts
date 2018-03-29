import { Evento } from './../../../../../domain/evento';
import { CategoriaParticipanteEventoService } from './../../../../../service/categoria-participante-evento.service';
import { CategoriaParticipanteEvento } from './../../../../../domain/categoria-participante-evento';
import { CategoriaParticipanteService } from './../../../../../service/categoria-participante.service';
import { CategoriaParticipante } from './../../../../../domain/categoria-participante';
import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
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

  id: number;

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
  ) { }

  ngOnInit() {
    this.isNew = true;
    this.title.setTitle('Novo Categoria Participante Evento');
    this.route.parent.params.subscribe(param => {
      this.id = param['id'];
      console.log(this.id);
      this.processaCategoriaParticipanteEvento();
      this.carregaCategoriaParticipantes();
      this.getCategoriaParticipantesEvento();
      this.evento.id = this.id;
    });
  }

  getCategoriaParticipantesEvento() {
    this.categoriaParticipanteEventoService.getCategoriaParticipantesEventoByEvento(this.id)
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
* Captura o id do Categoria Participante Evento
*/
  processaCategoriaParticipanteEvento() {
    if (this.id && !isNaN(this.id)) {
      // this.editar();
    } else {//se id não informado
      this.isNew = false;
    }
  }

  /**
     * Preparo para edição
     */
  // private editar() {
  //   this.isNew = false;

  //   this.categoriaParticipanteEventoService.getCategoriaParticipanteEvento(this.id).subscribe(categoriaParticipanteEvento => {
  //     this.categoriaParticipanteEventoService.categoriaParticipanteEvento = categoriaParticipanteEvento;
  //     this.categoriaParticipanteEvento = this.categoriaParticipanteEventoService.categoriaParticipanteEvento;
  //     this.atualizarTituloEdicao();
  //   });

  // }

  onSubmit() {
    this.categoriaParticipanteEvento.evento = this.evento;
    this.categoriaParticipanteEventoService.salvar(this.categoriaParticipanteEvento, this.id).subscribe(categoriaParticipanteEvento => {
      // this.router.navigate(['/evento/edit', evento.id]);
      this.getCategoriaParticipantesEvento();
      this.snackBar.open(`${categoriaParticipanteEvento.categoriaParticipante.titulo} salvo com sucesso!`, '', { duration: 10000 });
    });

  }

  voltar() {
    this.router.navigate(['eventos'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Categoria Participante Evento: ${this.categoriaParticipanteEvento.categoriaParticipante.titulo}`);
  }


}
