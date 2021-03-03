import { TestBed } from '@angular/core/testing';

import {CarItem, CarService} from './car.service';
import {HttpClientModule} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('car.service', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    }).compileComponents();
    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the cars list observable initialized', () => {
    expect(service.carsList$).toBeInstanceOf(Observable);
  });

  it('should get the cars list from the server', () => {
    const dummyCarsList = [
      {
        id: 'some_id',
        brand: 'Cadillac',
        model: '62 Fleetwood',
        acquisitionDate: null,
        manufactureDate: null,
        plateNumber: 'CWS999F',
        price: 13000,
        licensed: false
      }, {
        id: 'some_id',
        brand: 'Cadillac',
        model: '62 Fleetwood',
        acquisitionDate: null,
        manufactureDate: null,
        plateNumber: 'CWS999F',
        price: 13000,
        licensed: false
      }
    ] as CarItem[];

    service.carsList$.subscribe((data) => {
      expect(data).toEqual(dummyCarsList);
    });

    service.getCars();

    const request = httpMock.expectOne(`${environment.backendAPI}/car/list`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCarsList);
  });
});
