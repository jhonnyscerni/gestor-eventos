import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventoService } from '../../../../service/evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from '../../../../domain/evento';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit {

  idEvento: number;

  evento: Evento = new Evento();

  constructor(
    private title: Title,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];

    this.route.params.subscribe(param => {
      this.idEvento = param['id'];
      this.getEvento();
      this.evento.id = this.idEvento;
    });

  }

  /**
     * Preparo para edição
     */
    public getEvento() {
      this.eventoService.getEvento(this.idEvento).subscribe(evento => {
        this.eventoService.evento = evento;
        this.evento = this.eventoService.evento;
      });
  
    }
}
