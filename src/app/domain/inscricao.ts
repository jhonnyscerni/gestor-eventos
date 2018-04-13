import { Evento } from './evento';
import { Participante } from './participante';

export class Inscricao {
    id?: number;
    dtInscricao?: Date;
    dtCertificado?: Date;
    dtDeferimento?: Date;
    status?: string;
    certificadoLiberado?: boolean;
    justificativaNaoCertificado?: string;
    justificativaNaoDeferimento?: string;
    codigoCertificado?: string;
    codigoCracha?: string;
    codigoQrCode?: string;
    observacao?: string;
    evento?: Evento = new Evento();
    participante?: Participante = new Participante();
}