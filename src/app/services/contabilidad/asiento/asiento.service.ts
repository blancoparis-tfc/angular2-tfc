import {Injectable} from 'angular2/core';
import {Http,Response} from 'angular2/http';
import {Asiento} from './asiento';
import {LineaAsiento} from './lineaAsiento';
import {Resultado} from '../../../core/resultado';

@Injectable()
export class AsientoService{

  constructor(private http:Http){
  }

  getAsiento(){
    var asiento :Asiento = new Asiento(null,'',new Array<LineaAsiento>());
    this.http.get('./app/services/contabilidad/asiento/asiento.json')
      .map((res: Response) => res.json())
      .subscribe(res =>{
          asiento.id=res.id;
          asiento.descripcion=res.descripcion;
          asiento.lineas=res.lineas;
          console.info('Hemos recuperado el asiento ',asiento);
      });
    return asiento;
  }

  save(asiento: Asiento):any{
    //console.info('Asiento local',this.asiento);
    console.info('   Asiento parametro',asiento);
  }
}
