import {Component,Input} from 'angular2/core';
@Component({
  selector:'dbp-block',
  templateUrl:'/src/app/components/comun/block.component.html'
})
export class BlockComponent{
  @Input() mensaje:String;
}
