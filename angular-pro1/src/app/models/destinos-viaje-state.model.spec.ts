import { ReducerDestinosViajes,
DestinosViajeState,
initializeDestinosViajeState,
InitMyDataAction,
NuevoDestinoAction, 
VoteUpAction,
EliminarDestinoAction,
VoteDownAction,
ResetVotesAction,
ElegidoFavoritoAction} from "./destinos-viajes-state.model";

import { DestinoViaje } from "./destino-viaje.model";
import { reduceState } from '@ngrx/store';

describe('reducerDestinosViajes',() => {
    it('should reduce init data', () =>{
        //set up
        const prevState: DestinosViajeState = initializeDestinosViajeState();
        const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
        //action
        const newState: DestinosViajeState = ReducerDestinosViajes(prevState,action);
        // assertions
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].nombre).toEqual('destino 1');
    });

    it('should reduce new item added', () => {
        const prevState: DestinosViajeState = initializeDestinosViajeState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona','url'));
        const newState: DestinosViajeState = ReducerDestinosViajes(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('barcelona');
    });

    it('should reduce last item deleted', () => {
        const prevState: DestinosViajeState = initializeDestinosViajeState();
        const actionAdd: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Berlín', 'url'));
        const actionDel: EliminarDestinoAction = new EliminarDestinoAction();

        const stateAgregar: DestinosViajeState = ReducerDestinosViajes(prevState, actionAdd);
        const stateDel: DestinosViajeState = ReducerDestinosViajes(stateAgregar, actionDel);

        //expect(stateDel.items.length).toEqual(0);
        expect(stateDel.items.length).toEqual(prevState.items.length)
    });

    it('should reduce elegido favorito', () =>{
        const State: DestinosViajeState = initializeDestinosViajeState();
        const actAdd: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
        const actionAddMore: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Madrid', 'url2'));

        const AddedState: DestinosViajeState =  ReducerDestinosViajes(State,actAdd); 
        const fav: ElegidoFavoritoAction = new ElegidoFavoritoAction(AddedState.items[0]);    
        const favState: DestinosViajeState = ReducerDestinosViajes(AddedState,fav);


        expect(favState.items[0].isSelected()).toEqual(true);
        
    });

    it('should reduce vote up & vote down', () => {
        const prevState: DestinosViajeState = initializeDestinosViajeState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona','url'));
        
        const newState: DestinosViajeState = ReducerDestinosViajes(prevState, action);

        const ActionUp: VoteUpAction = new VoteUpAction(newState.items[0]);
        const VotedState: DestinosViajeState = ReducerDestinosViajes(newState,ActionUp);
        expect(VotedState.items[0].votes).toEqual(1);

        const ActionDown: VoteDownAction = new VoteDownAction(VotedState.items[0]);
        const VotedDownState: DestinosViajeState = ReducerDestinosViajes(VotedState,ActionDown);

        
        expect(VotedDownState.items[0].votes).toEqual(0);
    });

    it('should reduce reset votes', () =>{
        const prevState: DestinosViajeState = initializeDestinosViajeState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona','url'));
        const newState: DestinosViajeState = ReducerDestinosViajes(prevState, action);
        
        const ActionUp: VoteUpAction = new VoteUpAction(newState.items[0]);
        const VotedState: DestinosViajeState = ReducerDestinosViajes(newState,ActionUp);
    
        const ResetAction: ResetVotesAction = new ResetVotesAction();
        const ResetState: DestinosViajeState = ReducerDestinosViajes(VotedState, ResetAction);

        expect(ResetState.items[0].votes).toEqual(0);
    });


});