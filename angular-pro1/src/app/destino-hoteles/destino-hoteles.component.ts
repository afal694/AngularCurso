import { Component, OnInit, Input, HostBinding} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-destino-hoteles',
  templateUrl: './destino-hoteles.component.html',
  styleUrls: ['./destino-hoteles.component.css']
})
export class DestinoHotelesComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  constructor() { }

  ngOnInit(): void {
  }

}
