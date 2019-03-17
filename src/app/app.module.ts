import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import { MenuItem, MessageService } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ButtonModule} from 'primeng/button';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputMaskModule} from 'primeng/inputmask';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    AppRoutingModule,
    InputTextModule,
    MenuModule,
    CalendarModule,
    InputSwitchModule,
    ButtonModule,
    KeyFilterModule,
    SelectButtonModule,
    InputMaskModule,
    ReactiveFormsModule,
    TableModule,
    CardModule,
    ToastModule,
    routing
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})

export class AppModule {
    
 }
