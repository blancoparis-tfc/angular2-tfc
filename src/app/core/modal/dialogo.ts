import {
     DynamicComponentLoader,Directive,Host,SkipSelf,forwardRef,Injectable,
     ElementRef,Injector,provide,ViewEncapsulation,Component,ComponentRef,Provider}
     from 'angular2/core';
import {PromiseWrapper,Promise} from 'angular2/src/facade/async';
import {Type,isPresent} from 'angular2/src/facade/lang';
import { KeyboardEvent} from 'angular2/src/facade/browser';
import {CONST} from 'angular2/src/facade/lang';
import {KeyCodes} from '../keycode';

@Injectable()
export class DbpDialogo{

  constructor(private cargador: DynamicComponentLoader,private injector: Injector){}

  public alert(elemento:ElementRef,dialogoConf:DbpDialogoAlertConf):Promise<DbpDialogoRef>{
      var dbpDialogoRef:DbpDialogoRef=new DbpDialogoRef();
      var ocultarPromesa=  this.cargador.loadNextToLocation(BlockDialogoComponent,elemento);
      return this.cargador.loadNextToLocation(DialogoAlertComponent,elemento).then(containerRef =>{
        this.fill(containerRef,dbpDialogoRef,dialogoConf,ocultarPromesa);
        dbpDialogoRef.contentRef=containerRef;
        return dbpDialogoRef;
      });
  }

  public confirmar(elemento:ElementRef,dialogoConf:DbpDialogoConfirmarConf):Promise<ComponentRef>{
      var dbpDialogoRef:DbpDialogoRef=new DbpDialogoRef();
      var ocultarPromesa=  this.cargador.loadNextToLocation(BlockDialogoComponent,elemento);
      return this.cargador.loadNextToLocation(DialogoConfirarComponent,elemento).then(containerRef =>{
        this.fill(containerRef,dbpDialogoRef,dialogoConf,ocultarPromesa);
        dbpDialogoRef.contentRef=containerRef;
        return containerRef;
      });
  }

  public abrir(tipo:Type,elemento:ElementRef,dialogoConf:DbpDialogoBaseConf,providers: Array<Type | Provider | any[]> = []):Promise<DbpDialogoRef>{
    var dbpDialogoRef:DbpDialogoRef=new DbpDialogoRef();
    var ocultarPromesa=  this.cargador.loadNextToLocation(BlockDialogoComponent,elemento);
    providers.push(provide(DbpDialogoRef, {useValue: dbpDialogoRef}))
    var bindings =  Injector.resolve(providers);
    return this.cargador.loadNextToLocation(DialogoComponenteComponent,elemento,bindings).then(containerRef =>{
      this.fill(containerRef,dbpDialogoRef,dialogoConf,ocultarPromesa);
      if(isPresent(tipo)){
        return this.cargador.loadNextToLocation(tipo,dbpDialogoRef.elementRefContenedor,bindings).then(contentRef=>{
            dbpDialogoRef.cuandoCerramos.then((_)=>{contentRef.dispose();})
            dbpDialogoRef.componenteDentro=contentRef;
            dbpDialogoRef.contentRef=containerRef;
            return dbpDialogoRef;
        });
      }else{
          dbpDialogoRef.contentRef=containerRef;
          return dbpDialogoRef;
      }
    });
  }

  private fill(containerRef:ComponentRef,dbpDialogoRef:DbpDialogoRef,dialogoConf:DbpDialogoBaseConf,ocultarPromesa:Promise<ComponentRef>){
    containerRef.instance.configuacion=dialogoConf;
    containerRef.instance.dbpDialogoRef=dbpDialogoRef;
    ocultarPromesa.then(ocultarRef=>{
      dbpDialogoRef.cuandoCerramos.then((_)=>{ocultarRef.dispose();})
    });

  }

}
/**
* Es la referencia a un dialogo abierto.
**/
export class DbpDialogoRef{

    _contentRef:ComponentRef; // Representa al componente de la ventana.
    componenteDentro:ComponentRef; // Representa al componente que hay dentro de la ventana.
    elementRefContenedor: ElementRef; // Es elemento ref del contenedor de la ventana modal.
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
      this.contentRefDeferred.promise.then((_)=>{
        if(!this.isCerrado){
          this.isCerrado=true;
          this._contentRef.dispose(); // Esto cerrar la ventana modal.
          this.cuandoCerramosDeferred.resolve(resultado);
        }
      });
    }
}
export class DbpDialogoBaseConf{
  constructor(public titulo:String=''){}
}
export class DbpDialogoAlertConf extends DbpDialogoBaseConf{
  constructor(public mensaje:String,public titulo:String){super(titulo)}
}

export class DbpDialogoConfirmarConf extends DbpDialogoBaseConf{
  constructor(public mensaje:String = '',public titulo:String,
    public botonOk:String ='Ok',public botonCancelar:String ='Candelar' ){super(titulo) }
}

class AbstractDialogoComponent{
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
  selector:'dbp-dialogo-alert',
  templateUrl:'/src/app/core/modal/dialogo.alert.html',
  host:{'(body:keydown)':'documentKeypress($event)'}
})
export class DialogoAlertComponent extends AbstractDialogoComponent{
  public configuacion:DbpDialogoAlertConf;
}

@Component({
  selector:'dbp-dialogo-confirmar',
  templateUrl:'/src/app/core/modal/dialogo.confirmar.html',
  host:{'(body:keydown)':'documentKeypress($event)'}
})
export class DialogoConfirarComponent extends AbstractDialogoComponent{

  public configuacion:DbpDialogoConfirmarConf;
  public okDeferred:any;
  public cancelarDeferred:any;

  constructor(){
    super();
    this.okDeferred=PromiseWrapper.completer();
    this.cancelarDeferred=PromiseWrapper.completer();
  }

  get cuandoOk():Promise<any>{return this.okDeferred.promise;}

  get cuandoCancelar():Promise<any>{return this.cancelarDeferred.promise;}

  procesarOk(elemento=null){
      this.dbpDialogoRef.cuandoCerramos.then((_)=>{this.okDeferred.resolve(elemento);});
      this.dbpDialogoRef.cerrar();
  }
  procesarCancelar(elemento=null){
      this.dbpDialogoRef.cuandoCerramos.then((_)=>{this.cancelarDeferred.resolve(elemento);});
      this.dbpDialogoRef.cerrar();
  }
}
// TODO: Usamos la directiva, para pasarle el elementRef, superior al contenedor para poder inyectar algo. Lo suyo seria poder obtenerlo a traves del framework.
@Directive({
  selector: 'componente',
})
class MdDialogContent {
  constructor(dbpDialogo:DbpDialogoRef, elementRef: ElementRef) {
    dbpDialogo.elementRefContenedor=elementRef;
  }
}

@Component({
  selector:'dbp-dialogo-component',
  templateUrl:'/src/app/core/modal/dialogo.componente.html',
  directives:[MdDialogContent],
  host:{'(body:keydown)':'documentKeypress($event)'}
})
export class DialogoComponenteComponent extends AbstractDialogoComponent{
  public contentRef:ElementRef;
  constructor(dbpDialogo:DbpDialogoRef){
    super();
    this.contentRef=null;
  }
}

@Component({
  selector:'dbp-dialogo-block',
  template:'<div class="modal-backdrop fade in" ></div>'
})
export class BlockDialogoComponent{}
