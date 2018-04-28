import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../../@core/security/auth-guard';

const routes: Routes = [

  {
    path: "",
    canActivate: [AuthGuard],
    data: {
    }, children: [

      { path: '', component: UserComponent },
    ]
  }
];

export const UserRoutes = RouterModule.forChild(routes);
