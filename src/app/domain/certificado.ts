import { Assinatura } from './assinatura';
import { Evento } from './evento';
export class Certificado {
    id?: number;
    conteudoCertificado?: string;
    evento?: Evento = new Evento();
    imagem?: string;
    liberado?: boolean;
    assinatura?: Assinatura = new Assinatura();
}