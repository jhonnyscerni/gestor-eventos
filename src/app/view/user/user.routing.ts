import { AuthGuardUser } from './../../@core/security/auth-guard-user';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../../@core/security/auth-guard';
import { MinhaInscricaoListComponent } from './minhas-inscricoes/minha-inscricao-list/minha-inscricao-list.component';
import { MinhaInscricaoEditComponent } from './minhas-inscricoes/minha-inscricao-edit/minha-inscricao-edit.component';

const routes: Routes = [

  {
    path: "",
    canActivate: [AuthGuardUser],
    data: {
    }, children: [

      { path: '', component: UserComponent , children: [
        { path: '', component: MinhaInscricaoListComponent },
        { path: 'evento/:idEvento/minha-inscricao', component: MinhaInscricaoEditComponent},
        { path: 'evento/:idEvento/minha-inscricao/:idInscricao', component: MinhaInscricaoEditComponent},
      ]},
    ]
  }
];

export const UserRoutes = RouterModule.forChild(routes);
