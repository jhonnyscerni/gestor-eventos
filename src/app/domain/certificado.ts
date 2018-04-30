import { Evento } from './evento';
export class Certificado {
    id?: number;
    conteudo?: string;
    evento?: Evento = new Evento();
}