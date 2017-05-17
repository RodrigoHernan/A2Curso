import {Pipe, PipeTransform} from '@angular/core' ;


@Pipe({name : 'ConversorPipe'})
export class ConversorPipe implements PipeTransform {
    transform(value:number,exponent:string): number {
        let exp = parseFloat(exponent);
        return value * (isNaN(exp) ? 1 : exp);
    }
}

