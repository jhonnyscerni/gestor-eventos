
import { KeycloakService } from './@core/security/keycloak.service';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentHttpModule } from '@covalent/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './@core/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { ParticipanteService } from './service/participante.service';
import { DateTimeService } from './@core/util/date-time.service';

registerLocaleData(localePt, 'pt-BR');

export function initParticipante(participanteService: ParticipanteService): Function{
  return () => participanteService.initParticipanteLogado();
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule
  ],
  providers: [
    ParticipanteService,
    DateTimeService,
    {
      provide: APP_INITIALIZER,
      useFactory: initParticipante,
      deps: [ParticipanteService,KeycloakService],
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}