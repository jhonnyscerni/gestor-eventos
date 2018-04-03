import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'app-facilitador-list',
  templateUrl: './facilitador-list.component.html',
  styleUrls: ['./facilitador-list.component.css']
})
export class FacilitadorListComponent implements OnInit {

  configWidthColumns: ITdDataTableColumn[] = [
        { name: 'nome',  label: 'Nome', width: 300 },
        { name: 'titulo', label: 'Título', width: 200},
        { name: 'instituicao', label: 'Instituição', width: 150},
        { name: 'funcaoEvento', label: 'Função no Evento', width: 150},
        { name: 'acoes', label: 'Ações', width: 200},
      ];

      data = [
        {
          "nome": "Adriano Amorim",
          "titulo": "Diretor de Governaça",
          "instituicao": 'TCU',
          "funcaoEvento": 'Palestrante',
          "acoes": 'acoes',
        },
        {
          "nome": "Lilian Garcia",
          "titulo": "Chefe de Governaça",
          "instituicao": 'CNJ',
          "funcaoEvento": 'Palestrante',
          "acoes": 'acoes',
        },
        {
          "nome": "Ana Mendonca",
          "titulo": "Coordenadora",
          "instituicao": 'TSE',
          "funcaoEvento": 'Moderadora',
          "acoes": 'acoes',
        }
      ];

  constructor() { }

  ngOnInit() {
  }

}
