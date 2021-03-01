import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarItem, CarService} from '../../services/car.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car.list.html',
  styleUrls: [ './car.list.scss']
})
export class CarListComponent implements OnInit, OnDestroy {

  carsList: CarItem[] = [];

  private subscription: Subscription;

  constructor(private service: CarService) {
  }

  ngOnInit(): void {
    this.subscription = this.service.carsList$.subscribe((data) => {
      this.carsList = data;
    });
    this.service.getCars();
  }

  viewDetail(plateNumber: string): void {

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
