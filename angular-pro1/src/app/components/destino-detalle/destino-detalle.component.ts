import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { DestinoViaje } from "../../models/destino-viaje.model";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';

export class DestinosApiClientViejo {
    getById(id: string): DestinoViaje {
        console.log('llamado por la clase vieja');
        return null;
      }
}

export class DestinosApiClientDecorated extends DestinosApiClient {
    // constructor(store: Store<AppState>){
    //     super(store);
    //   }
       getById(id: string): DestinoViaje {
        console.log('Llamado por la clase decorada!');
        return super.getById(id);
        
    }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html', 
  styleUrls: ['./destino-detalle.component.css'],
  providers: [  //DestinosApiClientViejo
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated }  
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('Id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
