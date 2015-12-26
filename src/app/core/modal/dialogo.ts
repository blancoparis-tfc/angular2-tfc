import {
     DynamicComponentLoader
    ,Injectable
    ,ElementRef
    ,Injector
    ,provide
    ,Component
    ,ComponentRef} from 'angular2/core';
import {PromiseWrapper,Promise} from 'angular2/src/facade/async';
import { KeyboardEvent} from 'angular2/src/facade/browser';
import {CONST} from 'angular2/src/facade/lang';

@CONST()
export class KeyCodes {
  @CONST() static ESCAPE = 27;
  @CONST() static SPACE = 32;
  @CONST() static UP = 38;
  @CONST() static DOWN = 40;
}

@Injectable()
export class DbpDialogo{

  constructor(public cargador: DynamicComponentLoader){}

  public alert(elemento:ElementRef,dialogoConf:DbpDialogoAlertConf):Promise<DbpDialogoRef>{
      var dbpDialogoRef:DbpDialogoRef=new DbpDialogoRef();
      var ocultarPromesa=  this.cargador.loadNextToLocation(BlockDialogoComponent,elemento);
      return this.cargador.loadNextToLocation(DialogoAlertComponent,elemento).then(containerRef =>{
        console.info('Antes de entrar',containerRef);
        dbpDialogoRef.contentRef=containerRef;
        containerRef.instance.configuacion=dialogoConf;
        containerRef.instance.dbpDialogoRef=dbpDialogoRef;
        ocultarPromesa.then(ocultarRef=>{
          dbpDialogoRef.cuandoCerramos.then((_)=>{ocultarRef.dispose();})
        })
        return dbpDialogoRef;
      });
  }

}
/**
* Es la referencia a un dialogo abierto.
**/
export class DbpDialogoRef{
    _contentRef:ComponentRef; // Representa al componente de la ventana.
    private isCerrado:Boolean; // Nos indica se venta se ha cerrado.
    contentRefDeferred:any; // Lo usaremos, para sincronizar los datos.
    cuandoCerramosDeferred:any; // Se lanzara cuando se cierre la ventana
    constructor(){
      this._contentRef = null;
      this.isCerrado = false;
      this.contentRefDeferred=PromiseWrapper.completer();
      this.cuandoCerramosDeferred=PromiseWrapper.completer();
    }

    set contentRef(valor:ComponentRef){
        this._contentRef = valor;
        this.contentRefDeferred.resolve(valor);
    }

    get cuandoCerramos():Promise<any>{
      return this.cuandoCerramosDeferred.promise;
    }

    cerrar(resultado: any = null){
      console.info('Lanzada la operacion de cerrar',this.isCerrado);
      this.contentRefDeferred.promise.then((_)=>{
        console.info('entro');
        if(!this.isCerrado){
          this.isCerrado=true;
          this._contentRef.dispose(); // Esto cerrar la ventana modal.
          this.cuandoCerramosDeferred.resolve(resultado);
        }
      });
    }

}


export class DbpDialogoAlertConf{
  constructor(
    public mensaje:String,
    public mensajeOk:String,
    public titulo:String = ''
  ){

  }
}
@Component({
  selector:'dbp-dialogo',
  templateUrl:'/src/app/core/modal/dialogo.html',
  host:{
      '(body:keydown)':'documentKeypress($event)'
  }
})
export class DialogoAlertComponent{
  public configuacion:DbpDialogoAlertConf;
  public dbpDialogoRef:DbpDialogoRef;
  cerrarModal(){
      this.dbpDialogoRef.cerrar();
  }
  documentKeypress(event:KeyboardEvent){

    if (event.keyCode == KeyCodes.ESCAPE) {
      this.dbpDialogoRef.cerrar();
    }
  }
}


@Component({
  selector:'dbp-dialogo-block',
  template:'<div class="modal-backdrop fade in" ></div>'
})
export class BlockDialogoComponent{
}
