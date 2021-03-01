import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToasterService} from './toaster.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse): void {

    const zone = this.injector.get(NgZone);
    const toaster = this.injector.get(ToasterService);

    (error instanceof HttpErrorResponse
      ? () => {
        zone.run(() => {
          toaster.error(error.statusText);
        });
      }
      : () => console.log(error.stack))();
  }

  // TODO Read note below:
  // »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
  // Not used for now, until we come up with an agreement
  // regarding the information sent back from the server
  private parseCustomError(error: HttpErrorResponse): string {
    if (error.error) {
      try {
        return JSON.parse(error.error).message;
      } catch (e) {
        // Do nothing
      }
      return null;
    }
  }
}
