import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DestinoViaje } from './../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino',
  templateUrl: './form-destino.component.html',
  styleUrls: ['./form-destino.component.css']
})
export class FormDestinoComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
   
  constructor(private fb: FormBuilder) {
    this.onItemAdded = new EventEmitter(); 
    this.fg = this.fb.group({
      nombre: [''],
      url: ['']
    });
    
    this.fg.valueChanges.subscribe((form: any)=>{
      console.log(`Cambio en el formulario ${form}`);
    });
    
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean{
    this.onItemAdded.emit(new DestinoViaje(nombre,url));
    return false;
  }

}
