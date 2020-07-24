import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoHotelesComponent } from './components/destino-hoteles/destino-hoteles.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoComponent } from './components/form-destino/form-destino.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajeState, initializeDestinosViajeState, 
  ReducerDestinosViajes, 
  DestinosViajesEffects} from './models/destinos-viajes-state.model';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from "./guards/usuario-logueado/usuario-logueado.guard";
import { AuthService } from "./services/auth.service";
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';



export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main' , pathMatch: 'full'},
  { path: 'main', component: VuelosMainComponentComponent},
  { path: 'mas-info', component: VuelosMasInfoComponentComponent},
  { path: ':id', component: VuelosDetalleComponentComponent}
]

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destino/:id', component: DestinoDetalleComponent},
  { path: 'login', component: LoginComponent},
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [UsuarioLogueadoGuard]
  },
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesVuelos  
  }
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
    FormDestinoComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
  providers: [
    DestinosApiClient, AuthService, UsuarioLogueadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
