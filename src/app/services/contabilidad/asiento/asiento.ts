import {LineaAsiento} from './lineaAsiento';
export class Asiento{
  constructor(public id:Number,public descripcion:String,public lineas:Array<LineaAsiento>){
  }
}
