import {Component, OnInit} from '@angular/core';
import {CarDetail, CarService} from '../../services/car.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car.detail.html',
  styleUrls: [ './car.detail.scss']
})
export class CarDetailComponent implements OnInit {

  carDetail: CarDetail;

  constructor(private service: CarService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const sub: Subscription = this.service.getCarDetail(this.route.snapshot.queryParams['plateNumber']).subscribe((data) => {
      this.carDetail =  data;
      sub.unsubscribe();
    });
  }

}
