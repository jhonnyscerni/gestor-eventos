import { SharedModule } from './../../@core/shared/shared.module';
import { UserRoutes } from './user.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    SharedModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
