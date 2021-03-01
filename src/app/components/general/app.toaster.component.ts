import {Component, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-toaster',
  templateUrl: './app.toaster.html',
  styleUrls: [ './app.toaster.scss' ]
})
export class AppToasterComponent {

  @Input('message')
  public message: string;

  @Input('title')
  public title: string;

  @Input('toastType')
  public toastType: string;

  constructor(private modalRef: BsModalRef){}

  public hide(): void {
    this.modalRef.hide();
  }
}
