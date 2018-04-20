import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './@core/layout/main-layout/main-layout.component';

const appRoutes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: 'adm', loadChildren: './view/mngt/mngt.module#MngtModule'},
        { path: '', loadChildren: './view/portal/portal.module#PortalModule'},
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
