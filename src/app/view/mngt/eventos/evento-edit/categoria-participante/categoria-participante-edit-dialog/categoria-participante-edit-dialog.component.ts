import { CategoriaParticipanteEventoService } from './../../../../../../service/categoria-participante-evento.service';
import { CategoriaParticipanteEvento } from './../../../../../../domain/categoria-participante-evento';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { duration } from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaParticipante } from '../../../../../../domain/categoria-participante';
import { CategoriaParticipanteService } from '../../../../../../service/categoria-participante.service';

@Component({
  selector: 'app-categoria-participante-edit-dialog',
  templateUrl: './categoria-participante-edit-dialog.component.html',
  styleUrls: ['./categoria-participante-edit-dialog.component.css']
})
export class CategoriaParticipanteEditDialogComponent implements OnInit {

  categoriaParticipantes: CategoriaParticipante[] = [];

  idEvento: number;

  categoriaParticipanteEvento: CategoriaParticipanteEvento;

  constructor(
    private categoriaParticipanteService: CategoriaParticipanteService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaParticipanteEventoService: CategoriaParticipanteEventoService,
    public dialogRef: MatDialogRef<CategoriaParticipanteEditDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.categoriaParticipanteEventoService.getCategoriaParticipanteEvento(this.data.idCategoriaParticipanteEvento)
      .subscribe(categoriaParticipanteEvento => {
        // this.getCategoriaParticipantesEvento();
        this.categoriaParticipanteEvento = categoriaParticipanteEvento;
      })
    this.carregaCategoriaParticipantes();
  }

  onSubmit() {

    this.categoriaParticipanteEventoService.salvar(this.categoriaParticipanteEvento, this.data.idEvento)
      .subscribe(categoriaParticipanteEvento => {
        this.dialogRef.close(categoriaParticipanteEvento);
      },
        (err) => {
          this.snackBar.open(err, 'ERRO', { duration: 1000 })
        }
      )
  }


  compareByOptionId(idFirst: CategoriaParticipante, idSecond: CategoriaParticipante): boolean {
    return idFirst && idSecond && idFirst.id === idSecond.id;
  }

  /**
 *Carregando CategoriaParticipante
*/

carregaCategoriaParticipantes() {
  this.categoriaParticipanteService.getCategoriaParticipantes()
    .subscribe(categoriaParticipantes => this.categoriaParticipantes = categoriaParticipantes);
}

}
