import { EventoNovoComponent } from './eventos/evento-novo/evento-novo.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";

const routes: Routes = [
    { path: 'evento/novo', component: EventoNovoComponent},
    { path: 'evento/edit/:id', component: EventoEditComponent},
    {
        path: 'eventos', component: EventoListComponent, children: [
            { path: '', component: EventoListComponent}
        ]
    },
    {path: '', redirectTo: 'eventos'}
];

export const mgntRoutes: ModuleWithProviders = RouterModule.forChild(routes);