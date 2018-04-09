import { InscricaoService } from './../../service/inscricao.service';
import { InscricaoListComponent } from './eventos/evento-edit/inscricoes/inscricao-list/inscricao-list.component';
// tslint:disable-next-line:max-line-length
import { CategoriaParticipanteEditDialogComponent } from './eventos/evento-edit/categoria-participante/categoria-participante-edit-dialog/categoria-participante-edit-dialog.component';
import { FacilitadorEditComponent } from './eventos/evento-edit/facilitadores/facilitador-edit/facilitador-edit.component';
import { FacilitadorListComponent } from './eventos/evento-edit/facilitadores/facilitador-list/facilitador-list.component';
import { CategoriaParticipanteEventoService } from './../../service/categoria-participante-evento.service';
import { CategoriaParticipanteService } from './../../service/categoria-participante.service';
import { CategoriaParticipanteComponent } from './eventos/evento-edit/categoria-participante/categoria-participante.component';
import { EventoFormComponent } from './eventos/evento-form/evento-form.component';
import { EventoNovoComponent } from './eventos/evento-novo/evento-novo.component';
import { MenuLayoutComponent } from './../../@core/layout/menu-layout/menu-layout.component';
import { EventoMenuLateralComponent } from './eventos/evento-edit/evento-menu-lateral/evento-menu-lateral.component';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';
import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../@core/shared/shared.module';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { mgntRoutes } from './mngt-routes';
import { EventoService } from '../../service/evento.service';
import { TipoEventoService } from '../../service/tipo-evento.service';
import { NavListLayoutComponent } from '../../@core/layout/nav-list-layout/nav-list-layout.component';
import { NavViewLayoutComponent } from '../../@core/layout/nav-view-layout/nav-view-layout.component';


import { DateTimeService } from '../../@core/util/date-time.service';

import * as Moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { FacilitadorService } from '../../service/facilitador.service';
import { InscricaoEditComponent } from './eventos/evento-edit/inscricoes/inscricao-edit/inscricao-edit.component';
// import { OwlDateTimeModule, OWL_DATE_TIME_LOCALE, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';


export const MY_MOMENT_FORMATS: any = { // See the Moment.js docs for the meaning of these formats: https://momentjs.com/docs/#/displaying/format/

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
    SharedModule,
    mgntRoutes,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
  ],
  declarations: [
    EventoEditComponent,
    EventoNovoComponent,
    EventoFormComponent,
    EventoListComponent,
    CategoriaParticipanteComponent,
    CategoriaParticipanteEditDialogComponent,
    FacilitadorListComponent,
    FacilitadorEditComponent,
    InscricaoListComponent,
    InscricaoEditComponent,
    NavListLayoutComponent,
    EventoMenuLateralComponent,
    NavViewLayoutComponent,
    MenuLayoutComponent
  ],
  entryComponents: [CategoriaParticipanteEditDialogComponent],
  providers: [
    EventoService,
    CategoriaParticipanteService,
    CategoriaParticipanteEventoService,
    TipoEventoService,
    FacilitadorService,
    InscricaoService,
    DateTimeService,
    { provide: 'moment', useFactory: (): any => Moment },

    { provide: LOCALE_ID, useValue: 'pt-BR' },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },

    DateTimeService,
  ],
})
export class MngtModule {

  constructor(@Inject('moment') public moment: any,

    matIconRegistry: MatIconRegistry,

    domSanitizer: DomSanitizer) {

    /* : declarar matIconRegistry para adicionar os ícones customizados da comunidade de desenvolvimento */

    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));

    this.moment.locale('pt-br');

  }



}