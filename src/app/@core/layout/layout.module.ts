import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavViewLayoutComponent } from './nav-view-layout/nav-view-layout.component';
import { MenuLayoutComponent } from './menu-layout/menu-layout.component';
import { NavListLayoutComponent } from './nav-list-layout/nav-list-layout.component';
import { CovalentLayoutModule } from '@covalent/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatIconModule, MatListModule, MatToolbarModule, MatIconRegistry, MatButtonModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    CovalentLayoutModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    NavViewLayoutComponent,
    MenuLayoutComponent,
    NavListLayoutComponent,
    MainLayoutComponent
  ],
  exports: [
    NavViewLayoutComponent,
    MenuLayoutComponent,
    NavListLayoutComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { 


  constructor(

    matIconRegistry: MatIconRegistry,

    domSanitizer: DomSanitizer) {

    /* : declarar matIconRegistry para adicionar os ícones customizados da comunidade de desenvolvimento */

    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
    }
}
