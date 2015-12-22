import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink,Location} from 'angular2/router';
import {Menu} from '../../services/menu/menu';
import {MenuService} from '../../services/menu/menu.service';

@Component({
  selector:'cabecera',
  templateUrl:'/src/app/components/comun/cabecera.component.html',
  directives:[RouterLink,CORE_DIRECTIVES],
})
export class CabeceraComponent{
    menus:Menu[];
    activoMenu:Menu;

    constructor(public menuService:MenuService,private location:Location){
      this.menus= menuService.getMenus();
    }

    activeOpcionMenuClass(menu:Menu){
        return this.location.path().indexOf(menu.path) > -1;
    }

}
