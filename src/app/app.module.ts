import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CarListComponent} from './components/car/car.list.component';
import {CarService} from './services/car.service';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ToasterService} from './services/toaster.service';
import {GlobalErrorHandler} from './services/global.error.handler';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AppToasterComponent} from './components/general/app.toaster.component';
import {CarDetailComponent} from './components/car/car.detail.component';
import {ShoppingCartComponent} from './components/shoppingcart/shopping.cart.component';
import {ShoppingCartService} from './services/shopping.cart.service';
import {PopoverModule} from 'ngx-smart-popover';

@NgModule({
  declarations: [
    AppComponent,
    AppToasterComponent,
    ShoppingCartComponent,
    CarListComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PopoverModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    CarService,
    ToasterService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
