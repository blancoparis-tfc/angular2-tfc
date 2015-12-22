import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {AsientoService} from '../../../services/contabilidad/asiento/asiento.service';
import {Asiento} from '../../../services/contabilidad/asiento/asiento';
import {BlockComponent} from '../../comun/block.component';
import {Grid} from '../../comun/grid/grid';
import {Columna,TIPO_EDITABLE,TIPO_NO_EDITABLE} from '../../comun/grid/columna';

const CREAR:String='crear';
const ESPERA:String='espera';
const CREADO:String='creado';

@Component({
  selector:'asiento',
  templateUrl:'/src/app/components/contabilidad/asientos/asiento.component.html',
  directives:[BlockComponent,Grid]
})
export class AsientoComponent{

  modelo:Asiento;
  estado:String;
  columnas:Array<Columna>;
  constructor(public asientoService:AsientoService){
    this.modelo=asientoService.getAsiento();
    this.estado=CREAR;
    this.columnas=this.getColumnas();
  }

  private getColumnas():Array<Columna>{
    return [
        new Columna('id','id',TIPO_NO_EDITABLE),
        new Columna('cuenta','cuenta',TIPO_EDITABLE),
        new Columna('concepto','concepto',TIPO_EDITABLE),
        new Columna('importe','importe',TIPO_EDITABLE),
        new Columna('tipo','tipo',TIPO_EDITABLE)
    ];
  }

  onSubmit(){
    console.info(' Se realiza la operación de guarda de la operación');
    this.estado=ESPERA;
    this.asientoService.save(this.modelo);
    //this.estado=CREADO;
  }

  isVisibleForm(){return this.isCrear() || this.isEspera();}
  isCrear(){  return this.estado===CREAR; }
  isEspera(){  return this.estado===ESPERA; }
  isCreado(){  return this.estado===CREADO; }

}
