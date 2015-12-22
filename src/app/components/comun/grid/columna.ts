export const TIPO_NO_EDITABLE:String='noEditable';
export const TIPO_EDITABLE:String='Editable';
export class Columna {
  //public direccion:Number;
  constructor(
        public nombre:String
      , public descripcion:String
      , public tipo:String = TIPO_NO_EDITABLE
      , public direccion:Number = 1
      ){
    //this.direccion=1;
  }
}
