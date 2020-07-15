import { Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-destino-hoteles',
  templateUrl: './destino-hoteles.component.html',
  styleUrls: ['./destino-hoteles.component.css']
})
export class DestinoHotelesComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor() { 
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }
}
