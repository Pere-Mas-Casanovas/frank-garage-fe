import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AppToasterComponent} from '../components/general/app.toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private lastState: any = {};

  constructor(private bsModalService: BsModalService) {
  }

  public info(message: string): void {
    this.toast({ initialState: { message: message, title: 'Info', toastType: 'info' } });
  }

  public warning(message: string): void {
    this.toast({ initialState: { message: message, title: 'Warning', toastType: 'warning' } });
  }

  public error(message: string): void {
    this.toast({ initialState: { message: message, title: 'Error', toastType: 'error' } });
  }

  private toast(initialState: any): void {
    if (JSON.stringify(initialState) === JSON.stringify(this.lastState)) {
      return;
    }
    this.lastState = Object.assign({}, initialState);
    this.bsModalService.show(AppToasterComponent, Object.assign({}, initialState ));
    const subscription = this.bsModalService.onHide.subscribe(() => {
      this.lastState = {};
      subscription.unsubscribe();
    });
  }
}
