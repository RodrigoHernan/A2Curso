import {Directive, ElementRef, Input}  from '@angular/core';

@Directive({selector:'[Amarillito]'})
export class Amarillitodirective{
    constructor(el: ElementRef){
        el.nativeElement.style.backgroundColor = 'yellow';
    }
}