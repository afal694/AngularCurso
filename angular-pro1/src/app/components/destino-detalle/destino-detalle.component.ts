import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { DestinoViaje } from "../../models/destino-viaje.model";

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('Id');
    //this.destino = this.destinosApiClient.getById(id);
  }

}
