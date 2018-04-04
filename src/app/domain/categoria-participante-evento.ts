import { CategoriaParticipante } from './categoria-participante';
import { Evento } from './evento';

export class CategoriaParticipanteEvento {
    id?: number;
    vagas?: number;
    evento?: Evento = new Evento();
    categoriaParticipante?: CategoriaParticipante;
}