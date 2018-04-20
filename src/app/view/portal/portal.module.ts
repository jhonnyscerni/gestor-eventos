import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { portalRoutes } from './portal-routes';
import { SharedModule } from '../../@core/shared/shared.module';
import { EventoListComponent } from './evento-list/evento-list.component';
import { EventoService } from '../../service/evento.service';
import { DateTimeService } from '../../@core/util/date-time.service';
import { OwlDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import * as Moment from 'moment';

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
    portalRoutes,
    SharedModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
  ],
  declarations: [PortalComponent,
    EventoListComponent
  ],
  providers: [
    EventoService,
    DateTimeService,
    { provide: 'moment', useFactory: (): any => Moment },

    { provide: LOCALE_ID, useValue: 'pt-BR' },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
  ]
})
export class PortalModule {
  constructor(@Inject('moment') public moment: any,

    matIconRegistry: MatIconRegistry,

    domSanitizer: DomSanitizer) {

    /* : declarar matIconRegistry para adicionar os ícones customizados da comunidade de desenvolvimento */

    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));

    this.moment.locale('pt-br');

  }
}