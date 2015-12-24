import {Component} from 'angular2/core';
import {ModalDirective} from '../../../directives/comun/modal/modal.directive'
@Component({
  selector:'ejemplo-modal',
  templateUrl:'/src/app/components/ejemplos/modal/modal.html',
  directives:[ModalDirective]
})
export class ModalComponent{
  procesarOk(){
    console.info('Le dio al ok');
  }

}
