import { ComprovanteComponent } from './minhas-inscricoes/comprovante/comprovante.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { AuthGuardUser } from './../../@core/security/auth-guard-user';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../../@core/security/auth-guard';
import { MinhaInscricaoListComponent } from './minhas-inscricoes/minha-inscricao-list/minha-inscricao-list.component';
import { MinhaInscricaoEditComponent } from './minhas-inscricoes/minha-inscricao-edit/minha-inscricao-edit.component';
import { CrachaComponent } from './cracha/cracha.component';

const routes: Routes = [

  {
    path: "",
    canActivate: [AuthGuardUser],
    data: {
    }, children: [

      { path: '', component: UserComponent , children: [
        { path: '', component: MinhaInscricaoListComponent },
        { path: 'meu-cadastro', component: MeuCadastroComponent},
        { path: 'evento/:idEvento/gerar-cracha/:idInscricao', component: CrachaComponent },
        { path: 'evento/:idEvento/gerar-certificado/:idInscricao', component: CertificadoComponent},
        { path: 'evento/:idEvento/minha-inscricao', component: MinhaInscricaoEditComponent},
        { path: 'evento/:idEvento/minha-inscricao/:idInscricao', component: MinhaInscricaoEditComponent},
        { path: 'evento/:idEvento/minha-inscricao/:idInscricao/comprovante', component: ComprovanteComponent},
      ]},
    ]
  }
];

export const UserRoutes = RouterModule.forChild(routes);
