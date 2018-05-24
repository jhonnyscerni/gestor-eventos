import { Component, OnInit } from '@angular/core';
import { Participante } from '../../../domain/participante';
import { ParticipanteService } from '../../../service/participante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.css']
})
export class MeuCadastroComponent implements OnInit {

  idParticipante: number;

  q: number;

  participanteLogado: any;

  isNew: boolean;

  constructor(  private participanteService: ParticipanteService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {

    this.participanteService.getParticipanteLogado().subscribe(participante=>{
      this.participanteLogado = participante;
      this.processaParticipante();
    });
    this.isNew = true;
  }

     /**
  * Captura o id do Pessoa
  */
 processaParticipante() {
  if (this.participanteLogado.id && !isNaN(this.participanteLogado.id)) {
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
  
      this.participanteService.getParticipante(this.participanteLogado.id).subscribe(participanteLogado => {
        this.participanteService.participanteLogado = participanteLogado;
        this.participanteLogado = this.participanteService.participanteLogado;
        this.atualizarTituloEdicao();
      });
  
    }

    onSubmit() {

      this.participanteService.salvar(this.participanteLogado).subscribe(participanteLogado => {
        this.snackBar.open(`${participanteLogado.nome} salvo com sucesso!`, '', { duration: 10000 });
      });
  
    }


    atualizarTituloEdicao() {
      this.title.setTitle(`Edição do Participante: ${this.participanteLogado.nome}`);
    }

}
