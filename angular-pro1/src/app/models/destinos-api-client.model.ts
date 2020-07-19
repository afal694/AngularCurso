import { DestinoViaje } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';

export class DestinosApiClient {
    destinos: DestinoViaje[];
    current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

    constructor() {
        this.destinos = [];
    }
    //Agrega elementos al array destinos
    add(d: DestinoViaje) {
        this.destinos.push(d);
    }
    //devuelve elementos del array destinos
    getAll(): DestinoViaje[] {
        return this.destinos
    }

    // getById(id: string): DestinoViaje {
    //     return this.destinos.filter(function (d) {
    //         return d.id.toString() === id;
    //     })[0];
    // }

    elegir(d: DestinoViaje){
        this.destinos.forEach(x => x.setSelected(false));
        d.setSelected(true);
        this.current.next(d);//se agrega valor a observable
    }

    //método para subscribir observadores al observable
    subscribeOnChange(fn){
        this.current.subscribe(fn);
    }
}