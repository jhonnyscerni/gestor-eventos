import { AuthGuardAdmin } from './../../@core/security/auth-guard-admin';
import { RouterModule, Routes } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { AuthGuard } from '../../@core/security/auth-guard';
import { PortalComponent } from './portal.component';

const routes: Routes = [
    { path: '', component: PortalComponent  }

];

export const portalRoutes: ModuleWithProviders = RouterModule.forChild(routes);