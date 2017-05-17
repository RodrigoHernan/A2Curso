import { Component } from '@angular/core';

@Component({
selector: 'Init-Component',
template: '<h1>menu</h1> <a routerLink="/"> ir a inicio </a><router-outlet></router-outlet>'
})
export class InitComponent {
    constructor(
    ){
        
    }


}