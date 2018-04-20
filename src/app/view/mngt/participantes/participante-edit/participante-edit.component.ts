import { Participante } from './../../../../domain/participante';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { ParticipanteService } from '../../../../service/participante.service';

@Component({
  selector: 'app-participante-edit',
  templateUrl: './participante-edit.component.html',
  styleUrls: ['./participante-edit.component.css']
})
export class ParticipanteEditComponent implements OnInit {

  idParticipante: number;

  q: number;

  participante: Participante = new Participante();

  isNew: boolean;

  constructor(
    private participanteService: ParticipanteService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.isNew = true;
    this.title.setTitle('Novo Participante');
    this.idParticipante = this.route.snapshot.params['id'];
    this.processaParticipante();
  }

   /**
  * Captura o id do Pessoa
  */
 processaParticipante() {
  if (this.idParticipante && !isNaN(this.idParticipante)) {
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
  
      this.participanteService.getParticipante(this.idParticipante).subscribe(participante => {
        this.participanteService.participante = participante;
        this.participante = this.participanteService.participante;
        this.atualizarTituloEdicao();
      });
  
    }

    onSubmit() {

      this.participanteService.salvar(this.participante).subscribe(participante => {
        this.snackBar.open(`${participante.nome} salvo com sucesso!`, '', { duration: 10000 });
      });
  
    }


    atualizarTituloEdicao() {
      this.title.setTitle(`Edição do Participante: ${this.participante.nome}`);
    }

}
