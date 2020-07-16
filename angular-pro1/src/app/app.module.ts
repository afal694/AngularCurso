import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinoHotelesComponent } from './destino-hoteles/destino-hoteles.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoComponent } from './form-destino/form-destino.component';


const routes: Routes = [
   { path: '', redirectTo: 'home' , pathMatch: 'full'},
   { path: 'home', component: ListaDestinosComponent},
   { path: 'destino', component: DestinoDetalleComponent}
];

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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
