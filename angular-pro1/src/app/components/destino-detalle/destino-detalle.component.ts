import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { DestinoViaje } from "../../models/destino-viaje.model";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';


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
  providers: [  //DestinosApiClient
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated }  
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  coordenadas: [-74.0900414, 4.6973755];

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('Id');
    this.destino = this.destinosApiClient.getById(id);

    // mapbox
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapboxKey;
    var mapa = new mapboxgl.Map({
    container: 'mapa-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.0900414, 4.6973755], // starting position Lng, Lat
    zoom: 12.92 // starting zoom
    });
    
    // Add zoom and rotation controls to the map.
    mapa.addControl(new mapboxgl.NavigationControl());
    
    //marker and popup
    var marker = new mapboxgl.Marker()
    .setLngLat([-74.0900414, 4.6973755])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) // add popup
    .addTo(mapa);
    }



}
