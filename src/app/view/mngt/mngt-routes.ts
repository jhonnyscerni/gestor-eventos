import { GuardCertificado } from './../../@core/security/guard-certificado';
import { GerarCertificadoComponent } from './eventos/evento-edit/inscricoes/gerar-certificado/gerar-certificado.component';
import { CertificadoParticipanteDetailComponent } from './eventos/evento-edit/certificados/certificado-participante/certificado-participante-detail/certificado-participante-detail.component';
import { CertificadoParticipanteEditComponent } from './eventos/evento-edit/certificados/certificado-participante/certificado-participante-edit/certificado-participante-edit.component';
import { ParticipanteEditComponent } from './participantes/participante-edit/participante-edit.component';
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
        canActivate: [],
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
                    { path: 'facilitadores/novo', component: FacilitadorEditComponent },
                    { path: 'facilitadores/edit/:id', component: FacilitadorEditComponent },

                    { path: 'inscricoes', component: InscricaoListComponent },
                    { path: 'inscricoes/novo', component: InscricaoEditComponent },
                    { path: 'inscricoes/edit/:id', component: InscricaoEditComponent },

                    { path: 'inscricoes/gerar-cracha/:id', component: GerarCrachaComponent },
                    { path: 'inscricoes/gerar-certificado/:id', component: GerarCertificadoComponent },

                    { path: 'frequencia', component: FrequenciaListComponent },

                    { path: 'certificado-participante/:id/edit', component: CertificadoParticipanteEditComponent },
                    { path: 'certificado-participante/novo', component: CertificadoParticipanteEditComponent },
                    { path: 'certificado-participante/:id', component: CertificadoParticipanteDetailComponent },
                
                    {
                        path: 'certificado-participante', canActivate: [GuardCertificado], children: [
                            { path: 'novo', component: CertificadoParticipanteEditComponent },
                            { path: ':id', component: CertificadoParticipanteDetailComponent },

                        ]
                    },

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
    { path: '**', redirectTo: 'adm/eventos' }//Rota padrão

];

export const mgntRoutes: ModuleWithProviders = RouterModule.forChild(routes);