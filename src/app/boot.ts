import 'rxjs/operator/map';
import 'rxjs/operator/mergeMap';
import 'rxjs/observable/interval';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';
import {MenuService} from './services/menu/menu.service';
import {AsientoService} from './services/contabilidad/asiento/asiento.service';
import {DbpDialogo} from './core/modal/dialogo';

bootstrap(AppComponent,[
    ROUTER_PROVIDERS // Provedor de enrutamiento
    ,HTTP_PROVIDERS // Provedor del recurso http
    ,MenuService,AsientoService
    ,DbpDialogo
    ,provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]);
