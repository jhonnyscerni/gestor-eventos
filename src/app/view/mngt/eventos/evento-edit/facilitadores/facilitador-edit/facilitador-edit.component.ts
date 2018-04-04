import { Evento } from './../../../../../../domain/evento';
import { FacilitadorService } from './../../../../../../service/facilitador.service';
import { Facilitador } from './../../../../../../domain/facilitador';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-facilitador-edit',
  templateUrl: './facilitador-edit.component.html',
  styleUrls: ['./facilitador-edit.component.css']
})
export class FacilitadorEditComponent implements OnInit {

  isNew: boolean;

  idEvento: number;

  idFacilitador: number;

  facilitador: Facilitador = new Facilitador();


  constructor(
    private facilitadorService: FacilitadorService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.isNew = true;
    this.title.setTitle('Novo Facilitador');
    this.idFacilitador = this.route.snapshot.params['id'];
    console.log(`id Facilitador : ` + this.idFacilitador);
    this.route.parent.params.subscribe(param => {
      this.idEvento = param['id'];
      this.processaFacilitador();
      console.log(`id de evento em Facilitador : ` + this.idEvento);
      this.facilitador.evento.id = this.idEvento;
    });

  }

    /**
  * Captura o id do Componente
  */
 processaFacilitador() {
  if (this.idFacilitador && !isNaN(this.idFacilitador)) {
    this.editar();
  } else {//se id não informado
  //  this.criar();
    this.isNew = false;
  }
}

private criar() {

}

private editar() {
  this.facilitadorService.getFacilitador(this.idFacilitador).subscribe( facilitador => {
    this.facilitadorService.facilitador = facilitador;
    this.facilitador = this.facilitadorService.facilitador;
    this.atualizarTituloEdicao();
  });
}

onSubmit() {
  this.facilitadorService.salvar(this.facilitador, this.idEvento).subscribe(facilitador => {
    this.snackBar.open(`${facilitador.nome} salvo com sucesso!`, '', { duration: 10000 });
  });

}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Facilitador: ${this.facilitador.nome}`);
}


}
