import {Component} from 'angular2/core';
@Component({
  selector:'ejemplo-modal',
  templateUrl:'/src/app/components/ejemplos/modal/modal.html'
})
export class ModalComponent{
  procesarOk(){
    console.info('Le dio al ok');
  }
  
}
