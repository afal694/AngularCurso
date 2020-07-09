import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-destino-hoteles',
  templateUrl: './destino-hoteles.component.html',
  styleUrls: ['./destino-hoteles.component.css']
})
export class DestinoHotelesComponent implements OnInit {
  @Input() nombre: String;
  constructor() { }

  ngOnInit(): void {
  }

}
