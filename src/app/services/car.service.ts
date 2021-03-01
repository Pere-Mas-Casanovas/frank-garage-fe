import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface CarItem {
  id: string;
  brand: string;
  model: string;
  acquisitionDate: Date;
  manufactureDate: Date;
  price: number;
  plateNumber: string;
  licensed: boolean;
}

export interface CarDetail {
  carItem: CarItem;
  buildingName: string;
  address: string;
  zipcode: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsList: Subject<CarItem[]>;
  public carsList$: Observable<CarItem[]>;

  constructor(private httpClient: HttpClient) {
    this.carsList = new Subject<CarItem[]>();
    this.carsList$ = this.carsList.asObservable();
  }

  public getCars(): void {
    this.httpClient.get<CarItem[]>('http://localhost:8991/cognizant/frank-garage/rest/car/list', {})
      .subscribe(
        (data) => this.carsList.next(data));
  }

  public getCarDetail(plateNumber: string): Observable<CarDetail> {
    return this.httpClient.get<CarDetail>(`http://localhost:8991/cognizant/frank-garage/rest/car/detail/${plateNumber}`);
  }
}
