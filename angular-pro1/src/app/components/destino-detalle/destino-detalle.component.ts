import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { DestinoViaje } from "../../models/destino-viaje.model";
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';

export class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamado por la clase vieja');
    return null;
  }
}

interface AppConfig {
  apiEndPoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>){
    super(store);
  }
  getById(id: string): DestinoViaje {
    console.log('Llamado por la clase decorada!');
    console.log('config: '+this.config.apiEndPoint);
    return super.getById(id);
    
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html', 
  styleUrls: ['./destino-detalle.component.css'],
  providers: [  DestinosApiClient, 
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated },
    { provide: DestinosApiClientViejo, useExisting:DestinosApiClient }
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
