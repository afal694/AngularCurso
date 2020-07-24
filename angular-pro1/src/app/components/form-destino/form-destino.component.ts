import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { fromEvent } from 'rxjs';
import { map,filter,debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';


@Component({
  selector: 'app-form-destino',
  templateUrl: './form-destino.component.html',
  styleUrls: ['./form-destino.component.css']
})
export class FormDestinoComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  searchResults: string[];

  minLong = 5;
   
  constructor(private fb: FormBuilder) {
    this.onItemAdded = new EventEmitter(); 
    this.fg = this.fb.group({
      nombre: ['',Validators.compose([
        Validators.required,
        this.Nombrevalidator,
        this.NombreValidatorParametrizable(this.minLong)
      ])],
      url: ['', Validators.required]
    });
    
    this.fg.valueChanges.subscribe((form: any)=>{
      console.log(`Cambio en el formulario `,form);
    });
    
  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre,'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => ajax('/assets/datos.json'))
    ).subscribe(AjaxResponse => {
      this.searchResults = AjaxResponse.response;
      console.log(AjaxResponse.response);
      
    }); 

  }

  guardar(nombre: string, url: string): boolean{
    this.onItemAdded.emit(new DestinoViaje(nombre,url));
    return false;
  }

  Nombrevalidator (control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;
    if ( l > 0 && l < 3 ){
      return { minNombre: true };
    }
    return null;
  }

  NombreValidatorParametrizable( minLong: number ): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if ( l > 0 && l < minLong ){
        return { minLongNombre: true };
      }
      return null
    }
  }


}
