import {Directive,ElementRef,Renderer,Input,OnInit} from 'angular2/core';
@Directive({
  selector:'[dbpModal]'
})
export class ModalDirective implements OnInit{

    @Input('dbpModal') private target:String;

    ngOnInit(){
      console.info(' OnInit lo que hemos cargado en el parametro',this.target);
      this.renderer.setElementAttribute(this.elemento,'data-target','#'+this.target);
    }

    constructor(private elemento:ElementRef, private renderer:Renderer){
      var target:String ='myModal';
      this.renderer.setElementClass(this.elemento,'btn',true);
      this.renderer.setElementClass(this.elemento,'btn-primary',true);
      this.renderer.setElementClass(this.elemento,'btn-lg',true);
      this.renderer.setElementAttribute(this.elemento,'data-toggle','modal');
    }


}
