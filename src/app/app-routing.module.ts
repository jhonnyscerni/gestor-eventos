import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './@core/layout/main-layout/main-layout.component';

const appRoutes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: '', loadChildren: './view/mngt/mngt.module#MngtModule'},
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
