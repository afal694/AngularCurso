import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, InjectionToken, Injectable, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store } from '@ngrx/store';
import { EffectsModule, rootEffectsInit } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import  Dexie  from "dexie";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoHotelesComponent } from './components/destino-hoteles/destino-hoteles.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoComponent } from './components/form-destino/form-destino.component';
import { DestinosViajeState, initializeDestinosViajeState, 
  ReducerDestinosViajes, 
  DestinosViajesEffects,
  InitMyDataAction} from './models/destinos-viajes-state.model';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { UsuarioLogueadoGuard } from "./guards/usuario-logueado/usuario-logueado.guard";
import { AuthService } from "./services/auth.service";
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { DestinoViaje } from './models/destino-viaje.model';


// app-config
export interface AppConfig  {
  apiEndPoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// end app-config


// init routes
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main' , pathMatch: 'full'},
  { path: 'main', component: VuelosMainComponentComponent},
  { path: 'mas-info', component: VuelosMasInfoComponentComponent},
  { path: ':id', component: VuelosDetalleComponentComponent}
]

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  //{ path: 'destino/:id', component: DestinoDetalleComponent},
  { path: 'destino', component: DestinoDetalleComponent},
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
// end init routes

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


// app init 
export function init_app (appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajeState();
} 

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient){ }
  async initializeDestinosViajeState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN' : 'token-seguridad' });
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

// fin app init

// dexie db

@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  destinos: Dexie.Table<DestinoViaje,number>;
  constructor (){
    super('MyDataBase');
    this.version(1).stores({
      destinos:'++id, nombre, imagenUrl',
    });
  }
}

export const db = new MyDataBase();

// fin dexie db

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
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducerInitialState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument({}),
    ReservasModule, 
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService, UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService, { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDataBase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
