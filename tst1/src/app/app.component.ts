import { Component , NgZone } from '@angular/core';

import {InputComponent} from './input/input.component'; //inportar el input hijo

import {TicketService} from './services/ticket.service'; //inportar el service

import {FormBuilder , FormGroup} from '@angular/forms'; //inportar el service

import {Store} from '@ngrx/store'; //store
import {INCREMENT,DECREMENT,RESET,PANDERETA} from './services/counter' ; 
import {Observable} from 'rxjs/Observable'; //necesario AFireAuth

import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { FirebaseApp } from 'angularfire2/app'; //alamacenamiento storage. no existe especialidad asi que se usa directamente la app
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';

import { AngularFireAuth } from 'angularfire2/auth'; //necesario AFireAuth
import * as firebase from 'firebase/app'; //necesario AFireAuth





import {MdButtonModule, MdRipple} from '@angular/material';

interface AppState{
  counter: number;
}


@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  votacion = '';
  tickets:any;

  myForm : FormGroup;

  counter: Observable<number>;
  gato: Observable<string>;

  user: Observable<firebase.User>;
  ticketsFire:  FirebaseListObservable<any>;;


  ticketMongo:any;
  errorMessage:any;


constructor(
  private ticketServicio : TicketService,
  private fb : FormBuilder,
  private store:Store<AppState>,
  private _NgZone: NgZone,
  private router: Router,
  private db : AngularFireDatabase,
  public afAuth: AngularFireAuth,
  private elFirebaseApp : FirebaseApp
  ) {

let v = 1;
for(let v =0;v<=10;v++){}
console.log(v);
console.log("veeee");

this.traerTicketsMongo();

  this.counter = store.select('counter');
  this.gato = store.select('gato');
  
  this.tickets = ticketServicio.getTickets();
  this.myForm = fb.group({
    'name':['rodri'],
    'apellido':['ramos'],
    'facebook':['tuvieja']
  });

//firebase
  this.user = afAuth.authState;
  this.ticketsFire =  db.list('/items');
  console.log(this.ticketsFire)
  //ticketsFire.push({'id': 3, 'titulo': 'no me funciona el celular', 'estado': 'in progress'});
  //ticketsFire.push({'id': 4, 'titulo': 'no me funciona una lampara', 'estado': 'really'} );
  
  
}

traerTicketsMongo(){
    this.ticketServicio.getTicketsMongo()
  .then(
    ticket => this.ticketMongo = ticket,
    error => this.errorMessage = <any>error
  )
}


  votos = [
    {title: 'dale 1 ', hola: 'asdas'},
    {title: 'dale 2 ', hola: 'asdasasd'},
    {title: 'dale 3 ', hola: 'asdasasd'},
    {title: 'dale 4 ', hola: 'asdaasds'},

  ];

  addVoto(response:string){
    this.votacion = "usted eligio " +  response ; 
  }

  cantidad = 5 ;
  factor = 1 ; 

  onSubmit(value:string):void{
    console.log(value)
  }

  increment(){
    this.store.dispatch({type: INCREMENT});
  }
    decrement(){
    this.store.dispatch({type: DECREMENT});
  }
    reset(){
    this.store.dispatch({type: RESET});
  }
  pan(){
    this.store.dispatch({type: PANDERETA});
  }


progress: number = 0 ; 
label: string; 

ProcessOutsideAngularZone(){
  this.label  = ' inside' ;
  this.progress = 0 ; 
  this._increaseProgress(
    () => {console.log("finalizado sin ngzone");}
    );
}


ProcesswhithinAngularZone(){
  this.label  = ' inside' ;
  this.progress = 0 ;
  this._NgZone.runOutsideAngular(()=>{
          this._increaseProgress(
      () => { this._NgZone.run(
        ()=>{console.log("finalizado con ngzone");}
                              )
      } 
    );
  }) 

}

  _increaseProgress(doneCallback: ()=>void){
    this.progress+=1;
    console.log(`progreso: ${this.progress} %`);
    if (this.progress<100){
      window.setTimeout(()=>{
                              this._increaseProgress(doneCallback);
                            },10);
                            }
    else{doneCallback();}
  }

verTicket(id:number):void{
  this.router.navigate(['/ticket', id]);
}

//login Firebase
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
      var user = result.user;
       });
    }

  logout() {
    this.afAuth.auth.signOut();
  }
//AMB Firebase
  baja(key:string) {
     this.ticketsFire.remove(key); 
  }
  alta(objeto:any) {
    this.ticketsFire.push({'id': 3, 'titulo': objeto, 'estado': 'in progress'});
  }
  modificacion(key:string,objeto:any) {
     this.ticketsFire.update(key,{'id': 3, 'titulo': objeto, 'estado': 'Cambiado'});
  }
  subirImagen(file: any){
  //let file = { name: 'porfa', url: 'C:\Users\rramos.SUAREZ-MENENDEZ\Desktop\imagenes chicas\marvin.jpg' }
     var storageUrl = 'images/';
     let storageRef = this.elFirebaseApp.storage().ref(storageUrl + file.name);
  
    // var uploadTask = storageRef.child(file.name).put(file);
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function(error) {
          console.log(error);
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
            console.log("graboooo");
            console.log(downloadURL);

        });
     

  }
  onChange(event) {
    var files = event.srcElement.files;
  if (files !=null){
  console.log("files");
    console.log(files);
        console.log(files[0]);
         this.subirImagen(files[0]);
  }
  else{
    console.log("es null")
  }
     

    
  }


  //CRUD MONGO 
  verMongoTicket(id:number):void{
    this.router.navigate(['/ticket' , id ]);
  }
  UpdateMongoTicket(id:number):void{
    this.router.navigate(['/update' , id ]);
  }
  RemoveMongoTicket(id:number):void{
      this.ticketServicio.removeTicketMongo(id)
    .then(
        ok => this.checking(ok),
        error => console.log(<any>error)
    )
  }
  checking(ok:any){
    if(ok.n ==1){
      alert("se elimino correctament");
    }
    this.traerTicketsMongo();
  }


}
