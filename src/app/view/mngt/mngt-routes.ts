import { EventoDetailComponent } from './eventos/evento-edit/evento-detail/evento-detail.component';
import { EventoListComponent } from './eventos/evento-list/evento-list.component';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule, ModuleWithProviders } from "@angular/core";

const routes: Routes = [
    { path: 'evento/novo', component: EventoDetailComponent},
    { path: 'evento/edit/:id', component: EventoEditComponent,
    children: [
        { path: '', redirectTo: 'geral'},
        { path: 'geral', component: EventoDetailComponent }
    ]
},
    {
        path: 'eventos', component: EventoListComponent, children: [
            { path: '', component: EventoListComponent}
        ]
    },
    {path: '', redirectTo: 'eventos'}
];

export const mgntRoutes: ModuleWithProviders = RouterModule.forChild(routes);