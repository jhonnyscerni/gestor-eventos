import { Evento } from './evento';

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
    observacao?: string;
    evento?: Evento = new Evento();
}