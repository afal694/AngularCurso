import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import { DestinosApiClient } from './../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  @Input() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(public destinosApiClient: DestinosApiClient) {
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d!= null){
        this.updates.push('Se ha elegido a '+ d.nombre);
      }
    });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d: DestinoViaje){
    this.destinosApiClient.elegir(d);
    
  }

}
