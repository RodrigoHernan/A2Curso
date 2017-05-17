import { Routes } from '@angular/router' ; 

import {AppComponent} from '../app.component';
import { PageNotFoundComponent } from '../PageNotFound/page.not.nound.Component.component' ; 
import { TicketDetail } from '../tickets/ticket.detail';
import { UpdateComponent } from '../update/update.component';



export const  APPROUTER:Routes= [
    {path:'', component:AppComponent},
    {path:'ticket/:id', component:TicketDetail },
    {path:'update/:id', component:UpdateComponent },
    {path:'**', component:PageNotFoundComponent }
];
