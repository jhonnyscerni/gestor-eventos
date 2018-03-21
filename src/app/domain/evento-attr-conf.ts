import { Evento } from './evento';
import { EventoAttrValue } from './evento-attr-value';

export class EventoAttrConf {
	id?: number;
	name?: string;
	label?: string;
	viewOrder?: number;
	required?: boolean;
	habilitado?: boolean;
	evento?: Evento;

	type?: string;
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	default?: string;
}