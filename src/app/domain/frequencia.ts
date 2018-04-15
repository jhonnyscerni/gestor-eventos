import { Inscricao } from './inscricao';

export class Frequencia {
    id?: number;
    dataFrequencia?: Date;
    frequenciaTurno?: string;
    inscricao?: Inscricao = new Inscricao();
}
