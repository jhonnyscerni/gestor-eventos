import { CategoriaParticipanteEventoService } from './../../../../../../service/categoria-participante-evento.service';
import { CategoriaParticipanteEvento } from './../../../../../../domain/categoria-participante-evento';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { duration } from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-participante-edit-dialog',
  templateUrl: './categoria-participante-edit-dialog.component.html',
  styleUrls: ['./categoria-participante-edit-dialog.component.css']
})
export class CategoriaParticipanteEditDialogComponent implements OnInit {

  idEvento: number;

  categoriaParticipanteEvento: CategoriaParticipanteEvento;

  constructor(
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
  }

  onSubmit() {

    this.categoriaParticipanteEventoService.salvar(this.categoriaParticipanteEvento, this.data.idEvento )
      .subscribe(categoriaParticipanteEvento => {
        this.dialogRef.close(categoriaParticipanteEvento);
      },
        (err) => {
          this.snackBar.open(err, 'ERRO', { duration: 1000 })
        }
      )
  }

}
