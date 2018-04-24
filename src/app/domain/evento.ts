
import { TipoEvento } from "./tipo-evento";

export class Evento {
    id?: number;
    nome?: string;
    sigla?: string;
    email?: string;
    descricao?: string;
    tipoDeEvento?: TipoEvento;
    local?: string;
    publico?: string;
    cargaHoraria?: string;
    inicioEvento?: Date ;
    fimEvento?: Date;
    inicioInscricao?: Date;
    fimInscricao?: Date;

}