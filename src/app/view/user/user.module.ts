import { CertificadoService } from './../../service/certificado.service';
import { EventoService } from './../../service/evento.service';
import { KeycloakService } from './../../@core/security/keycloak.service';
import { MinhaInscricaoEditComponent } from './minhas-inscricoes/minha-inscricao-edit/minha-inscricao-edit.component';

import { SharedModule } from './../../@core/shared/shared.module';
import { UserRoutes } from './user.routing';
import { NgModule, LOCALE_ID, Inject, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { InscricaoService } from '../../service/inscricao.service';
import { DateTimeService } from '../../@core/util/date-time.service';
import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import * as Moment from 'moment';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ParticipanteService } from '../../service/participante.service';
import { CategoriaParticipanteEventoService } from '../../service/categoria-participante-evento.service';
import { MinhaInscricaoListComponent } from './minhas-inscricoes/minha-inscricao-list/minha-inscricao-list.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CertificadoComponent } from './certificado/certificado.component';
import { CrachaComponent } from './cracha/cracha.component';



export const MY_MOMENT_FORMATS: any = { // See the Moment.js docs for the meaning of these formats: https://momentjs.com/docs/#/displaying/format/F

  parseInput: 'l LT',

  fullPickerInput: 'l LT',

  datePickerInput: 'l',

  timePickerInput: 'LT',

  monthYearLabel: 'MMM YYYY',

  dateA11yLabel: 'LL',

  monthYearA11yLabel: 'MMMM YYYY',

};



@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    SharedModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    NgxQRCodeModule,
  ],
  declarations: [
    UserComponent,
    MinhaInscricaoListComponent,
    MinhaInscricaoEditComponent,
    MeuCadastroComponent,
    CrachaComponent,
    CertificadoComponent,
],
  providers: [
    EventoService,
    InscricaoService,
    ParticipanteService,
    CategoriaParticipanteEventoService,
    CertificadoService,
    DateTimeService,
    { provide: 'moment', useFactory: (): any => Moment },

    { provide: LOCALE_ID, useValue: 'pt-BR' },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
  ],
})
export class UserModule {
  constructor(@Inject('moment') public moment: any,

    matIconRegistry: MatIconRegistry,

    domSanitizer: DomSanitizer) {

    /* : declarar matIconRegistry para adicionar os ícones customizados da comunidade de desenvolvimento */

    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));

    this.moment.locale('pt-br');
  }
}