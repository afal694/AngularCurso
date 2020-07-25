import { Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { AppState } from '../../app.module';
import { Store } from '@ngrx/store';
import { VoteUpAction, VoteDownAction } from '../../models/destinos-viajes-state.model';

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
  public id: string;

  constructor(private store: Store<AppState>) { 
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown(){
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

}
