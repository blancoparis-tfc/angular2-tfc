import {Component,ElementRef,DynamicComponentLoader,Injector,ChangeDetectorRef,provide} from 'angular2/core';
import {ModalDirective} from '../../../directives/comun/modal/modal.directive'
import {BlockComponent} from '../../comun/block.component';
import {DbpDialogo,DbpDialogoAlertConf,DbpDialogoConfirmarConf,DbpDialogoBaseConf,DbpDialogoRef} from '../../../core/modal/dialogo';
import {About} from '../../about/about.component';
import {AsientoComponent} from '../../contabilidad/asientos/asiento.component';
@Component({
  selector:'ejemplo-modal',
  templateUrl:'/src/app/components/ejemplos/modal/modal.html',
  directives:[ModalDirective]
})
export class ModalComponent{

  constructor(private elemento:ElementRef,private dialogo:DbpDialogo,private cargador: DynamicComponentLoader,private injector: Injector){}

  abrirModal(){
    this.dialogo.alert(this.elemento,new DbpDialogoAlertConf('Mensajeasdaf a ag ggds hfdhsdfhsdghsgfhjsgfjgsfjgfjghjhdjhgjhgj h hg hjj djdhgj hdjd hfg jfghj fd jgj','Titulo')).then(dialogoRef=>{
      dialogoRef.cuandoCerramos.then((_)=>{console.info('Se ha cerrado el alert')});
      return dialogoRef;
    });
  }

  abrirConfirmar(){
    this.dialogo.confirmar(this.elemento,new DbpDialogoConfirmarConf('Mensaje de confirmar','Ejemplo de confirmar')).then(dialogoComponent=>{
        dialogoComponent.instance.cuandoOk.then((_)=>{console.info(' despues Ok 234');});
        dialogoComponent.instance.cuandoCancelar.then((_)=>{console.info(' despues cancelar 234');});
    });
  }
  abrirComponente(){
    var id=[provide(ParamId, {useValue:new ParamId(2)})]
    this.dialogo.abrir(EjemploFormularioComponent,this.elemento,new DbpDialogoBaseConf('Ejemplo para'),id).then(dialogoRef=>{
      console.info('Componente de dentro',dialogoRef.componenteDentro);
      dialogoRef.cuandoCerramos.then((_)=>{
        console.info('Se cerro el componente',dialogoRef.componenteDentro.instance);
      });
      return dialogoRef;
    });
  }

  abrirComponenteComplejo(){
    this.dialogo.abrir(AsientoComponent,this.elemento,new DbpDialogoBaseConf('Ejemplo para')).then(dialogoRef=>{
      return dialogoRef;
    });
  }
}

export class ParamId{
  constructor(public id:Number){}
}

@Component({
  selector:'ejemplo-formulario',
  templateUrl:'/src/app/components/ejemplos/modal/formulario.html'
})
export class EjemploFormularioComponent{
  public dato:String='antes';
  constructor(id:ParamId,public dbpDialogoRef:DbpDialogoRef){
    console.info('El id',id,dbpDialogoRef);
    this.dato="eco"+id.id;
  }

  ok(){
    this.dbpDialogoRef.cerrar();
  }
}
