import {ActionReducer , Action  } from  '@ngrx/store';


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const PANDERETA = 'PANDERETA';

export function counterReducer(state:number=0,action: Action){
        switch(action.type){
            case INCREMENT:
                return state + 1; 
            case DECREMENT:
                return state - 1; 
            case RESET:
                return 0; 
            default:
                return state ; 
        }
}
export function tomala(state:number=0,action: Action){
        switch(action.type){
            case PANDERETA:
                return 'PANDERETA'; 
            case DECREMENT:
                return 'state - 1'; 
            case RESET:
                return '0'; 
            default:
                return 'state' ; 
        }
}
        
