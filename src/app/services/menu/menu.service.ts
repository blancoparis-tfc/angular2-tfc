import {Injectable} from 'angular2/core';
import {Http,Response} from 'angular2/http';
import {Menu} from './menu';

@Injectable()
export class MenuService{

  private menus:Menu[];

  constructor(private http:Http){
    this.menus =[];
    http.get('./app/services/menu/menu.json')
      .map((res: Response) => res.json())
      .subscribe(res => { res.menu.forEach(menu => {  this.menus.push(new Menu(menu.etiqueta,menu.path)); }); });
  }

  getMenus(){
    return this.menus;
  }

}
