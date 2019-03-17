
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';

const APP_ROUTES: Routes = [
    { path: '', component: ListaComponent },
    { path: 'lista', component: ListaComponent },
    { path: 'formulario', component: FormularioComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);