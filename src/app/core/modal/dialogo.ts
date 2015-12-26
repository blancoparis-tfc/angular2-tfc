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
        console.info('Antes de entrar',containerRef,dialogoConf);
        dbpDialogoRef.contentRef=containerRef;
        containerRef.instance.configuacion=dialogoConf;
        containerRef.instance.dbpDialogoRef=dbpDialogoRef;
        ocultarPromesa.then(ocultarRef=>{
          dbpDialogoRef.cuandoCerramos.then((_)=>{ocultarRef.dispose();})
        })
        return dbpDialogoRef;
      });
  }

  public confirmar(elemento:ElementRef,dialogoConf:DbpDialogoConfirmarConf):Promise<ComponentRef>{
      var dbpDialogoRef:DbpDialogoRef=new DbpDialogoRef();
      var ocultarPromesa=  this.cargador.loadNextToLocation(BlockDialogoComponent,elemento);
      return this.cargador.loadNextToLocation(DialogoConfirarComponent,elemento).then(containerRef =>{
        console.info('Antes de entrar',containerRef,dialogoConf);
        dbpDialogoRef.contentRef=containerRef;
        containerRef.instance.configuacion=dialogoConf;
        containerRef.instance.dbpDialogoRef=dbpDialogoRef;
        ocultarPromesa.then(ocultarRef=>{
          dbpDialogoRef.cuandoCerramos.then((_)=>{ocultarRef.dispose();})
        })
        return containerRef;
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
    public titulo:String = ''
  ){

  }
}
@Component({
  selector:'dbp-dialogo-alert',
  templateUrl:'/src/app/core/modal/dialogo.alert.html',
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


export class DbpDialogoConfirmarConf{
  constructor(public mensaje:String = '',public titulo:String ='',
    public botonOk:String ='Ok',public botonCancelar:String ='Candelar' ){ }
}

@Component({
  selector:'dbp-dialogo-confirmar',
  templateUrl:'/src/app/core/modal/dialogo.confirmar.html',
  host:{
      '(body:keydown)':'documentKeypress($event)'
  }
})
export class DialogoConfirarComponent{
  public configuacion:DbpDialogoConfirmarConf;
  public dbpDialogoRef:DbpDialogoRef;
  public okDeferred:any;
  public cancelarDeferred:any;
  constructor(){
    this.okDeferred=PromiseWrapper.completer();
    this.cancelarDeferred=PromiseWrapper.completer();
  }
  cerrarModal(){
      this.dbpDialogoRef.cerrar();
  }

  documentKeypress(event:KeyboardEvent){
    if (event.keyCode == KeyCodes.ESCAPE) {
      this.dbpDialogoRef.cerrar();
    }
  }

  get cuandoOk():Promise<any>{
    return this.okDeferred.promise;
  }

  get cuandoCancelar():Promise<any>{
    return this.cancelarDeferred.promise;
  }

  procesarOk(elemento=null){
      console.info('Operacion OK');
        this.okDeferred.resolve(elemento);
        this.dbpDialogoRef.cuandoCerramos.then((_)=>{
      });
      this.dbpDialogoRef.cerrar();
  }
  procesarCancelar(elemento=null){
      console.info('Operación cancelar');
      this.dbpDialogoRef.cuandoCerramos.then((_)=>{
        this.cancelarDeferred.resolve(elemento);
      });
      this.dbpDialogoRef.cerrar();
  }
}


@Component({
  selector:'dbp-dialogo-block',
  template:'<div class="modal-backdrop fade in" ></div>'
})
export class BlockDialogoComponent{
}
