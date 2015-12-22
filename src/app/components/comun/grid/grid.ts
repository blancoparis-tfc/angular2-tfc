import {Component,Input} from 'angular2/core';
import {Columna} from './columna';
import {Ordenar} from './ordernar';
@Component({
    selector: 'dbp-grid',
    templateUrl:'/src/app/components/comun/grid/grid.html'
})
export class Grid{
  @Input() columnas:Array<Columna>;
  @Input() filas:Array<any>;
  columnaActiva:Columna;

  private algoritmoOrdenar:Ordenar = new Ordenar();

  ordenar(columna:Columna){
    this.columnaActiva=columna;
    this.algoritmoOrdenar.ordernar(columna,this.filas);
  }

  esColumnaActiva(columna:Columna){
    return this.columnaActiva===columna;
  }

}
