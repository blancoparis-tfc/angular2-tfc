import {Columna} from './columna';
export class Ordenar{

  constructor(){
  }

  ordernar(columna:Columna,datos:any[]){
      this.establecerDireccion(columna);
      this.ordernarDatos(columna,datos);
  }

  private establecerDireccion(columna:Columna){
        columna.direccion=-columna.direccion;
  }

  private ordernarDatos(columna:Columna,datos:any[]){
    datos.sort((izquierda,derecha) => {
      if(izquierda[columna.nombre] === derecha[columna.nombre]){
          return 0;
      }else if(izquierda[columna.nombre] > derecha[columna.nombre]){
          return columna.direccion;
      }else{
          return -columna.direccion;
      }
    });
  }
}
