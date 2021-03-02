import {Component, OnInit} from '@angular/core';
import {CarDetail, CarItem, CarService} from '../../services/car.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Subscription} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping.cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car.detail.html',
  styleUrls: [ './car.detail.scss']
})
export class CarDetailComponent implements OnInit {

  carDetail: CarDetail;

  constructor(
    private carService: CarService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const sub: Subscription = this.carService.getCarDetail(this.route.snapshot.queryParams.plateNumber).subscribe((data) => {
      this.carDetail =  data;
      sub.unsubscribe();
    });
  }

  addToCart(carItem: CarItem): void {
    this.shoppingCartService.addItem(carItem);
  }

}
