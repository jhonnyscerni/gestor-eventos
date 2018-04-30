import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificado-participante-edit',
  templateUrl: './certificado-participante-edit.component.html',
  styleUrls: ['./certificado-participante-edit.component.css']
})
export class CertificadoParticipanteEditComponent implements OnInit {

  constructor() { }



  ngOnInit() {
  }


  onBodyTextEditorKeyUp(textValue) {

    console.log("Text is change" , event)
  }

}
