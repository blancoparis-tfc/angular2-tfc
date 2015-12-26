import {Component,ElementRef} from 'angular2/core';
import {ModalDirective} from '../../../directives/comun/modal/modal.directive'
import {BlockComponent} from '../../comun/block.component';
import {DbpDialogo,DbpDialogoAlertConf,DbpDialogoConfirmarConf} from '../../../core/modal/dialogo';
@Component({
  selector:'ejemplo-modal',
  templateUrl:'/src/app/components/ejemplos/modal/modal.html',
  directives:[ModalDirective]
})
export class ModalComponent{

  constructor(private elemento:ElementRef,private dialogo:DbpDialogo){}

  abrirModal(){
    this.dialogo.alert(this.elemento,new DbpDialogoAlertConf('Mensaje','Titulo')).then(dialogoRef=>{
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
}
