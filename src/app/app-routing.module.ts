import { UnauthorizedComponent } from './view/unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './@core/layout/main-layout/main-layout.component';
import { AuthGuard } from './@core/security/auth-guard';

const appRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {   path: 'adm', 
                loadChildren: './view/mngt/mngt.module#MngtModule', 
                canActivate: [AuthGuard], 
                data: {
                    roles:["admin"],
                    mensagem: "Necessario permissao de ADMIN para acessar esta pagina."
                } 
            },
            { path: '', loadChildren: './view/user/user.module#UserModule' },
            { path: 'unauthorized', component: UnauthorizedComponent },
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
