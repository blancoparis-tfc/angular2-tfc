import {Component} from 'angular2/core';
import {ROUTER_PROVIDERS,RouterOutlet,RouteConfig} from 'angular2/router';
import {Inicio} from './components/inicio/inicio.component';
import {About} from './components/about/about.component';
import {Contacto} from './components/contacto/contacto.component';
import {CabeceraComponent} from './components/comun/cabecera.component';
import {PieComponent} from './components/comun/pie.component';
import {AsientoComponent} from './components/contabilidad/asientos/asiento.component';
import {ModalComponent} from './components/ejemplos/modal/modal.component';

@RouteConfig([
  {path: '/Inicio',   component: Inicio,    as: 'Inicio'},
  {path: '/About',    component: About,     as: 'About'},
  {path: '/Contacto', component: Contacto,  as: 'Contacto'},
  {path: '/Asiento',  component:AsientoComponent, as:'Asiento'},
  {path: '/ModalEjemplo', component: ModalComponent, as:'ModalEjemplo'}
])
@Component({
    selector: 'my-app',
    templateUrl: '/src/app/app.component.html',
    directives:[CabeceraComponent,RouterOutlet,PieComponent]
})
export class AppComponent {}
