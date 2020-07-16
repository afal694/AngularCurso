import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {

  @Input() onItemAdded: EventEmitter<DestinoViaje>;

  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  ngOnInit(): void {
  }

  // (nombre: string, url: string): boolean{
  //   this.destinos.push(new DestinoViaje(nombre,url));
  //   return false;
  // }

  agregado(d: DestinoViaje){
    this.destinos.push(d);
  }

  elegido(d: DestinoViaje){
    this.destinos.forEach(function(x) {
      x.setSelected(false)
    });
    d.setSelected(true);
  }

}
