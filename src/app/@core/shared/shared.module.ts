import { ErrorHandlerService } from './../../service/error-handler.service';
import { GuardCertificado } from './../security/guard-certificado';
import { UnauthorizedComponent } from './../../view/unauthorized/unauthorized.component';
import { LayoutModule } from './../layout/layout.module';

import { AuthGuardUser } from './../security/auth-guard-user';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule,
} from '@covalent/core';
import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatRadioModule,
} from '@angular/material';
import { NgxChartsModule, } from '@swimlane/ngx-charts';
import { KeycloakService } from '../security/keycloak.service';
import { AuthGuardAdmin } from '../security/auth-guard-admin';
import { AuthGuard } from '../security/auth-guard';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';

const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule,
];

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSnackBarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatRadioModule,
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule,
];

const CHART_MODULES: any[] = [
  NgxChartsModule,
];

const OUTERS: any[] = [
  
]



@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CHART_MODULES,
    FLEX_LAYOUT_MODULES,
    LayoutModule
  ],
  declarations: [
    SafeHtmlPipe,
    UnauthorizedComponent
  ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    CHART_MODULES,
    FLEX_LAYOUT_MODULES,
    LayoutModule,
    SafeHtmlPipe,
  ],
  providers:[
    KeycloakService,
    AuthGuardAdmin,
    AuthGuardUser,
    AuthGuard,
    GuardCertificado,
    ErrorHandlerService

  ]
})
export class SharedModule { }