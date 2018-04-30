import { CertificadoParticipanteDetailComponent } from './eventos/evento-edit/certificados/certificado-participante/certificado-participante-detail/certificado-participante-detail.component';
import { CertificadoParticipanteEditComponent } from './eventos/evento-edit/certificados/certificado-participante/certificado-participante-edit/certificado-participante-edit.component';
import { ParticipanteEditComponent } from './participantes/participante-edit/participante-edit.component';
import { UnauthorizedComponent } from './../unauthorized/unauthorized.component';
import { AuthGuardAdmin } from './../../@core/security/auth-guard-admin';
import { FrequenciaListComponent } from './eventos/evento-edit/frequencia/frequencia-list/frequencia-list.component';
import { InscricaoEditComponent } from './eventos/evento-edit/inscricoes/inscricao-edit/inscricao-edit.component';
import { InscricaoListComponent } from './eventos/evento-edit/inscricoes/inscricao-list/inscricao-list.component';
import { FacilitadorEditComponent } from './eventos/evento-edit/facilitadores/facilitador-edit/facilitador-edit.component';
import { FacilitadorListComponent } from './eventos/evento-edit/facilitadores/facilitador-list/facilitador-list.component';
import { CategoriaParticipanteComponent } from './eventos/evento-edit/categoria-participante/categoria-participante.component';
import { EventoFormComponent } from './eventos/evento-form/evento-form.component';
import { EventoNovoComponent } from './eventos/evento-novo/evento-novo.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { GerarCrachaComponent } from './eventos/evento-edit/inscricoes/gerar-cracha/gerar-cracha.component';
import { LeitorQrcodeComponent } from './leitor-qrcode/leitor-qrcode.component';
import { AuthGuard } from '../../@core/security/auth-guard';
import { ParticipanteListComponent } from './participantes/participante-list/participante-list.component';

const routes: Routes = [
    { path: 'qr-code', component: LeitorQrcodeComponent },
    {
        path: "",
        canActivate: [AuthGuard],
        data: {
            roles: ['admin'],
            mensagem: 'Você nao possui permissao de Administrador!'
        }, children: [
            { path: 'evento/novo', component: EventoNovoComponent },
            { path: 'participante/novo', component: ParticipanteEditComponent },
            { path: 'participante/edit/:id', component: ParticipanteEditComponent },
            { path: 'participantes', component: ParticipanteListComponent },
            {
                path: 'evento/edit/:id', component: EventoEditComponent, children: [
                    { path: 'geral', component: EventoFormComponent },

                    { path: 'vagas', component: CategoriaParticipanteComponent },

                    { path: 'facilitadores', component: FacilitadorListComponent },
                    { path: 'facilitador/novo', component: FacilitadorEditComponent },
                    { path: 'facilitador/edit/:id', component: FacilitadorEditComponent },

                    { path: 'inscricoes', component: InscricaoListComponent },
                    { path: 'inscricao/novo', component: InscricaoEditComponent },
                    { path: 'inscricao/edit/:id', component: InscricaoEditComponent },

                    { path: 'inscricao/gerar-cracha/:id', component: GerarCrachaComponent },

                    { path: 'frequencia', component: FrequenciaListComponent },

                    { path: 'certificado/novo', component: CertificadoParticipanteEditComponent },
                    { path: 'certificado/:id', component: CertificadoParticipanteDetailComponent },
                    { path: 'certificado/edit/:id', component: CertificadoParticipanteEditComponent },
                ]
            },
            {
                path: 'eventos', component: EventoListComponent, children: [
                    { path: '', component: EventoListComponent },
                ]
            },
            { path: '', redirectTo: 'eventos' }
        ]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', redirectTo: 'adm/eventos' }//Rota padrão

];

export const mgntRoutes: ModuleWithProviders = RouterModule.forChild(routes);