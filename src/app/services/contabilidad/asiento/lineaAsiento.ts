export class LineaAsiento{
  constructor(
      public id:Number,
      public cuenta:String,
      public concepto:String,
      public importe: Number,
      public tipo:String
    ){}
}
