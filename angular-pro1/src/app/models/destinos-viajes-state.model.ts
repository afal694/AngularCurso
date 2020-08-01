import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';
import { HttpClientModule } from "@angular/common/http";

//estado
export interface DestinosViajeState{
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}

export const initializeDestinosViajeState = function(){
    return{
        items: [],
        loading: false,
        favorito: null
    }
}

//Acciones
export enum DestinosViajeActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] VoteUp',
    VOTE_DOWN = '[Destinos Viajes] VoteDown',
    ELIMINAR_DESTINO = '[Destinos Viajes] Eliminar',
    RESET_VOTES =  '[Destinos Viajes] Reset Votes',
    INIT_MY_DATA = '[Destinos Viajes] Init my Data'

}

export class NuevoDestinoAction implements Action {
    type = DestinosViajeActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajeActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
    type = DestinosViajeActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
    type = DestinosViajeActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViaje) {}
}

export class EliminarDestinoAction implements Action {
    type = DestinosViajeActionTypes.ELIMINAR_DESTINO;
    constructor() {}
}

export class ResetVotesAction implements Action {
    type = DestinosViajeActionTypes.RESET_VOTES;
    constructor() {}
}

export class InitMyDataAction implements Action {
    type = DestinosViajeActionTypes.INIT_MY_DATA;
    constructor(public destinos: string[]) {}
}

export type DestinosViajeActions = NuevoDestinoAction | ElegidoFavoritoAction |
VoteUpAction | VoteDownAction| EliminarDestinoAction | InitMyDataAction | ResetVotesAction;

//Reducers
export function ReducerDestinosViajes (
    state: DestinosViajeState,
    action: DestinosViajeActions
): DestinosViajeState {
    switch (action.type) {
        case DestinosViajeActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino]
            };
        }
        case DestinosViajeActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x => x.setSelected(false));
            const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
            fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
        }
        case DestinosViajeActionTypes.VOTE_UP: {
            const d: DestinoViaje = (action as VoteUpAction).destino;
            d.voteUp();
            return { ...state };
        }
        case DestinosViajeActionTypes.VOTE_DOWN: {
            const d: DestinoViaje = (action as VoteDownAction).destino;
            d.voteDown();
            return { ...state };
        }
        case DestinosViajeActionTypes.ELIMINAR_DESTINO: {
            state.items.splice(state.items.length-1,1);
            console.log(state.items);            
            return { ...state };
        }
        case DestinosViajeActionTypes.RESET_VOTES: {
            state.items.forEach(x => x.ResetVotes());            
            return { ...state };
        }
       case DestinosViajeActionTypes.INIT_MY_DATA: {
           const destinos: string [] = (action as InitMyDataAction).destinos;
           console.log(`InitMyDataAction: ${destinos}`);
           
           return {
               ...state,
               items: destinos.map((d) => new DestinoViaje(d,''))
           };
       }
    }
    return state;
}

//effects

@Injectable()
export class DestinosViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.action$.pipe(
        ofType(DestinosViajeActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private action$: Actions){

    }
}