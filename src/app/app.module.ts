import { AuthGuardAdmin } from './@core/security/auth-guard-admin';
import { KeycloakService } from './@core/security/keycloak.service';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentHttpModule } from '@covalent/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './@core/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './@core/layout/main-layout/main-layout.component';

import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent
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
    KeycloakService,
    AuthGuardAdmin,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}