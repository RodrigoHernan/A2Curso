import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable' ; 

import 'rxjs/add/operator/catch' ; 
import 'rxjs/add/operator/map' ; 
import 'rxjs/add/operator/toPromise' ; 

import { TICKETS } from './mocks/tickets.mocks';

    @Injectable()  // declaramos que es un Injectable
    export class TicketService{     
    urlBaackEnd = "http://localhost:3000/";    
    miVariableTicketGlobal = "soy una variable"; // podemos crear variables globales en cualquier componente     

    constructor(private http: Http){}

        getTicketsMongo():Promise<any[]>{
            return this.http.get(this.urlBaackEnd + 'tickets').
            toPromise()
            .then(this.extractData)
            .catch(this.handleError);
        }
        getTicketMongo(idNumer:number):Promise<any[]>{
        return this.http.post(this.urlBaackEnd + 'ticket', {"id": idNumer})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
        }

        updateTicketMongo(idNumer:number, titulo: string, estado:string):Promise<any[]>{
        return this.http.post(this.urlBaackEnd + 'ticketUpdate', 
        {"id": idNumer,
        "titulo":titulo,
        "estado":estado
        })
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    //removeTicketMongo
    //     removeTicketMongo(idNumer:number):Promise<any[]>{
    //     return this.http.post(this.urlBaackEnd + 'ticketRemove', 
    //     {"id": idNumer})
    //     .toPromise()
    //     .then(this.extractData)
    //     .catch(this.handleError);
    // }
            removeTicketMongo(idNumer:number):Promise<any[]>{
                return this.post(this.urlBaackEnd , 'ticketRemove', {"id": idNumer} );
            }

        private post(url : string, accion: string,body : any){
        return this.http.post(url + accion ,body)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);     
        }

        private extractData(res: Response){
            let body = res.json();
            console.log("body mostrado desde el service" , body);
            return body.result || {};
        }

        private handleError(error: Response | any){
            let errMsg:string;
            if(error instanceof Response){
                const body = error.json() ||'';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
            else{
                errMsg = error.message ? error.message : error.toString();
            }
            console.error(errMsg);
            return Observable.throw(errMsg);
        }

        getTickets(){ 
          
            return TICKETS;     // regresamos todos los tickets   
        }      
         getVariableGlobal():string{          
            return this.miVariableTicketGlobal;         
        }   
         getTicket(id:number){ 
            let ticket = TICKETS.find(x => x.id == id);
          return ticket;     
         }   

         getTicketObserver(id){
             return Observable.create(observer=>{
                 setTimeout(()=>{
                     observer.next(
                         TICKETS.find(
                             (ticket)=>ticket.id == id
                         )
                     )
                 },3000);

             });
         }
     }  