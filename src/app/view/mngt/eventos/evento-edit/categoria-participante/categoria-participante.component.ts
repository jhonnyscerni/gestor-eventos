import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';


@Component({
  selector: 'app-categoria-participante',
  templateUrl: './categoria-participante.component.html',
  styleUrls: ['./categoria-participante.component.css']
})
export class CategoriaParticipanteComponent implements OnInit {

  configWidthColumns: ITdDataTableColumn[] = [
    { name: 'categoria',  label: 'Categoria', width: 600 },
    { name: 'vagas', label: 'Vagas', width: 100},
    { name: 'acoes', label: 'Ações', width: 300},
  ];

  data = [
    {
      "categoria": "ALUNO",
      "vagas": "10",
      "acoes": 'acoes',
    },
    {
      "categoria": "PROFESSOR",
      "vagas": "20",
      "acoes": 'acoes',
    },
    {
      "categoria": "SERVIDOR",
      "vagas": "20",
      "acoes": ["Editar  Excluir"],
    }
  ];


  categoriaParticipantes = [
    {value: 'ESTUDANTE', viewValue: 'ESTUDANTE'},
    {value: 'ADVOGADO', viewValue: 'ADVOGADO'},
    {value: 'PROFISSIONAL', viewValue: 'PROFISSIONAL'}
  ];

  constructor() { }

  ngOnInit() {
  }

}