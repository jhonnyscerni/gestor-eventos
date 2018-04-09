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

const routes: Routes = [
    { path: 'evento/novo', component: EventoNovoComponent },
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
        ]
    },
    {
        path: 'eventos', component: EventoListComponent, children: [
            { path: '', component: EventoListComponent }
        ]
    },
    { path: '', redirectTo: 'eventos' }
];

export const mgntRoutes: ModuleWithProviders = RouterModule.forChild(routes);