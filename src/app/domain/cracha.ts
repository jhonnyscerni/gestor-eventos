import { Evento } from './evento';
export class Cracha {
    id?: number;
    nomeModelo?: string;
    evento?: Evento = new Evento();
    imagemTopo?: string;
    imagemRodape?: string;
}