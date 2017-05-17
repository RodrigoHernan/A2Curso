import {Component , Input,Output, EventEmitter} from '@angular/core' ; 
@Component ({
    selector: 'my-component-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.css']
})
export class InputComponent{

    @Input() voto:string; 
    @Input() Variable2:string; 
    @Output() addVoto = new EventEmitter<string>();

    constructor(){
        console.log("entrando al input");
    }

    votar():void{
        this.addVoto.emit(this.voto);
    }
}