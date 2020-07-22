import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import { DestinosApiClient } from './../models/destinos-api-client.model';
import { AppState } from '../app.module';
import { Store } from '@ngrx/store';
import { ElegidoFavoritoAction, DestinosViajesEffects, DestinosViajeActionTypes, NuevoDestinoAction, EliminarDestino } from '../models/destinos-viajes-state.model';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
    providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {

  @Input() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all;
  constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.updates = [];
    this.store.select(state => state.destinos.favorito).subscribe(
      d => {
        const fav = d;
        if (d != null){
          this.updates.push('Se ha elegido a '+ d.nombre);
        }
      }
    );

   store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }


  ngOnInit(): void {
  }

  agregado(d: DestinoViaje){
    this.store.dispatch(new NuevoDestinoAction(d));// redux
  }


  elegido(d: DestinoViaje){
      this.store.dispatch(new ElegidoFavoritoAction(d));// redux
  }

  EliminarDestino(){
    this.store.dispatch(new EliminarDestino());//redux
  }
}
