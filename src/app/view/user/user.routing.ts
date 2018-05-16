import { AuthGuardUser } from './../../@core/security/auth-guard-user';
import { InscricaoListComponent } from './inscricoes/inscricao-list/inscricao-list.component';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../../@core/security/auth-guard';
import { InscricaoEditComponent } from './inscricoes/inscricao-edit/inscricao-edit.component';

const routes: Routes = [

  {
    path: "",
    canActivate: [AuthGuardUser],
    data: {
    }, children: [

      { path: '', component: UserComponent , children: [
        { path: '', component: InscricaoListComponent },
        { path: 'inscricao', component: InscricaoEditComponent }
      ]},
    ]
  }
];

export const UserRoutes = RouterModule.forChild(routes);
