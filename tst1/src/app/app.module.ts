import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

//componentes
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { PageNotFoundComponent } from './PageNotFound/page.not.nound.Component.component';
import { InitComponent } from './init.component';
import { TicketDetail } from './tickets/ticket.detail';
//pipes
import { ConversorPipe } from './pipes/conversor.pipes';

//directives

import {Amarillitodirective } from './directives/highlight.directive';
import {Gigantdirective} from './directives/gigant.directive';

//Servicios
import {TicketService} from './services/ticket.service';

//ngrx
import {StoreModule} from '@ngrx/store';
import {counterReducer, tomala} from './services/counter';

//routes 
import {RouterModule, Routes} from '@angular/router';
import {APPROUTER} from './commons/router';

//Material 
import { trigger, state, style, transition, animate } from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import 'hammerjs';


//firebase 
import {AngularFireModule} from 'angularfire2';
//Angularfire2
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UpdateComponent } from './update/update.component';
import { FirebaseApp } from 'angularfire2/app'; //alamacenamiento storage. no existe especialidad asi que se usa directamente la app
import 'firebase/storage';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC15KxmqUVJlO6P2gke0lj93v9G_YlCnZg",
    authDomain: "a2crud.firebaseapp.com",
    databaseURL: "https://a2crud.firebaseio.com",
    projectId: "a2crud",
    storageBucket: "a2crud.appspot.com",
    messagingSenderId: "185040594689"
  }
};


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ConversorPipe,
    Gigantdirective,
    Amarillitodirective,
    PageNotFoundComponent,
    InitComponent,
    TicketDetail,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    StoreModule.provideStore({counter: counterReducer,gato: tomala}),
    RouterModule.forRoot(APPROUTER),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [TicketService,FirebaseApp ],
  bootstrap: [InitComponent]
})
export class AppModule { }
