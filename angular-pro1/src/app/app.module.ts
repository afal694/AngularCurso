import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoHotelesComponent } from './destino-hoteles/destino-hoteles.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoComponent } from './form-destino/form-destino.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajeState, initializeDestinosViajeState, 
  ReducerDestinosViajes, 
  DestinosViajesEffects} from './models/destinos-viajes-state.model';




const routes: Routes = [
   { path: '', redirectTo: 'home' , pathMatch: 'full'},
   { path: 'home', component: ListaDestinosComponent},
   { path: 'destino', component: DestinoDetalleComponent}
];

//redux init
export interface AppState {
  destinos: DestinosViajeState;
}
const reducers: ActionReducerMap<AppState> = {
  destinos: ReducerDestinosViajes
}; 

let reducerInitialState = {
  destinos: initializeDestinosViajeState()
};

//redux fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoHotelesComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducerInitialState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument({}) 
  ],
  providers: [DestinosApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
