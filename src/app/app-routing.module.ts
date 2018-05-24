import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './@core/layout/main-layout/main-layout.component';
import { AuthGuard } from './@core/security/auth-guard';

const appRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'adm', loadChildren: './view/mngt/mngt.module#MngtModule' },
            { path: '', loadChildren: './view/user/user.module#UserModule' },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
