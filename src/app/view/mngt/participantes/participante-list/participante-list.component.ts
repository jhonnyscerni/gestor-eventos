import { Component, OnInit } from '@angular/core';
import { Participante } from '../../../../domain/participante';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { ParticipanteService } from '../../../../service/participante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-participante-list',
  templateUrl: './participante-list.component.html',
  styleUrls: ['./participante-list.component.css']
})
export class ParticipanteListComponent implements OnInit {

  idEvento: number;

  evento: Participante = new Participante();

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'id', label: '#', width: 50 },
    { name: 'nome', label: 'Nome', width: 300 },
    { name: 'instituicaoOrigem', label: 'Instituição', width: 150 },
    { name: 'email', label: 'Email', width: 150 },
    { name: 'cpf', label: 'CPF', width: 150 },
    { name: 'tituloEleitor', label: 'Titulo de Eleitor', width: 200 },
    { name: 'acoes', label: 'Ações', width: 150 },
  ];

  data = [];
  
  constructor(
    private participanteService: ParticipanteService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public snackBar: MatSnackBar,
    private _dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Participantes');
    this.getParticipantes();
  }

  getParticipantes() {
    this.participanteService.getParticipantes()
    .subscribe(data => this.data = data);
  }



  excluirParticipante(id: number) {
    this._dialogService.openConfirm({
      message: 'Deseja excluir esse Participante ?',
      disableClose: true,
      title: 'Exclusão',
      cancelButton: 'Não',
      acceptButton: 'Sim',
    }).afterClosed().subscribe((aceitou: boolean) => {
      if (aceitou) {
        this.participanteService.excluirParticipante(id)
            .subscribe(() => {
              this.getParticipantes();
            })
      } else {
        console.log('Não aceitou excluir o participante ');
      }
    })
  }

}
