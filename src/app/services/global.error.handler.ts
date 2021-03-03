import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToasterService} from './toaster.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(httpError: Error | HttpErrorResponse): void {

    const zone = this.injector.get(NgZone);
    const toaster = this.injector.get(ToasterService);

    (httpError instanceof HttpErrorResponse
      ? () => {
        zone.run(() => {
          toaster.error(httpError.error.message);
        });
      }
      : () => console.log(httpError.stack))();
  }
}
