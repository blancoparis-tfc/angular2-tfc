import {Component,DynamicComponentLoader,ElementRef} from 'angular2/core';
import {ModalDirective} from '../../../directives/comun/modal/modal.directive'
import {BlockComponent} from '../../comun/block.component';
import {DbpDialogo,DbpDialogoAlertConf} from '../../../core/modal/dialogo';
@Component({
  selector:'ejemplo-modal',
  templateUrl:'/src/app/components/ejemplos/modal/modal.html',
  directives:[ModalDirective]
})
export class ModalComponent{
//DynamicComponentLoader
  constructor(
     private cargadorDeComponentes:DynamicComponentLoader
    ,private elemento:ElementRef
    ,private dialogo:DbpDialogo
  ){

  }

  procesarOk(){
    console.info('Le dio al ok');
  }

  abrirModal(){
    console.info('Abrir una ventana modal 21');
    //this.cargadorDeComponentes.loadNextToLocation(BlockComponent,this.elemento);
    this.dialogo.alert(this.elemento,new DbpDialogoAlertConf('Mensaje','Boton Ok','Titulo')).then(dialogoRef=>{
      console.info('Se ha procesado el alert');
      return dialogoRef;
    });
  }
}
