/* EDU: este serviço DateTimeService oferece métodos de trabalho com data-hora que serão extensivamente usados */

 

import { Injectable } from '@angular/core';

import * as Moment from 'moment'; /* EDU: biblioteca de formatação de data/hora */

 

/* EDU: formato padrão de timestamp de data e hora que será intercambiado com o back-end */

export const DATE_FORMAT: Moment.MomentFormatSpecification = "YYYY-MM-DD'T'HH:mm:ss.zzz'Z'";

 

@Injectable()

export class DateTimeService {

 

    constructor() { /**/ }

 

    /* EDU: corrige uma DataHora extraindo horas referentes a TimeZoneLocal,

            pois após sua serialização em JSON, esta data será adicionada da mesma quantidade,

            para ficar na hora padrão GMT+0 o que é um bug.

       OBS: Toda Data/Hora que for passada para um JSON tem antes que ser passada por esta variável. */

    public adjustDateTimeToJSON(pDateTime: Date): Date {

        pDateTime = Moment(pDateTime, DATE_FORMAT).toDate();

        let nDateTime: Date = pDateTime;

        // nDateTime.setHours(pDateTime.getHours() - pDateTime.getTimezoneOffset() / 60);

        return nDateTime;

    }

 

    /* EDU: quando uma DataHora chega de um JSON, usamos a biblioteca Moment

            para formatar para o padrão da classe Date.

       OBS: Toda Data/Hora que for recebida de um JSON tem que ser passada por esta variável posteriormente. */

    public adjustDateTimeFromJSON(pDateTime: Date): Date {

        return Moment(pDateTime, DATE_FORMAT).toDate();

    }

 

    /* EDU: retorna verdadeiro se a DataHora for válida */

    public isValid(pDateTime: Date): Boolean {

        return Moment(pDateTime, DATE_FORMAT).isValid();

    }

 

    /* EDU: retorna verdadeiro quando as duas DataHora informadas são iguais */

    public isEqual(firstDateTime: Date, secondDateTime: Date): Boolean {

        return Moment(firstDateTime).isSame(secondDateTime);

    }

 

    /* EDU: retorna verdadeiro se a primeira DataHora for menor (anterior) ou igual à segunda */

    public isBeforeOrEqual(firstDateTime: Date, secondDateTime: Date): Boolean {

        return Moment(firstDateTime).isSameOrBefore(secondDateTime);

    }

 

    /* EDU: retorna verdadeiro se a primeira DataHora for menor (anterior) que a segunda */

    public isBefore(firstDateTime: Date, secondDateTime: Date): Boolean {

        return Moment(firstDateTime).isBefore(secondDateTime);

    }

 

    /* EDU: retorna verdadeiro se a primeira DataHora for maior (posterior) ou igual à segunda */

    public isAfterOrEqual(firstDateTime: Date, secondDateTime: Date): Boolean {

        return Moment(firstDateTime).isSameOrAfter(secondDateTime);

    }

 

    /* EDU: retorna verdadeiro se a primeira DataHora for maior (posterior) que a segunda */

    public isAfter(firstDateTime: Date, secondDateTime: Date): Boolean {

        return Moment(firstDateTime).isAfter(secondDateTime);

    }

 

}