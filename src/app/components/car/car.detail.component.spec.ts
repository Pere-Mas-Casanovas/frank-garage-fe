import {CarDetailComponent} from './car.detail.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarDetail, CarItem, CarService} from '../../services/car.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {ShoppingCartService} from '../../services/shopping.cart.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs';

describe('car.detail.component', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let serviceSpy: SpyObj<CarService>;
  let shoppingCartSpy: SpyObj<ShoppingCartService>;
  let detailObs: Observable<CarDetail>;

  beforeEach(() => {
    detailObs = new Observable<CarDetail>();
    serviceSpy = createSpyObj('CarService', ['getCarDetail']);
    serviceSpy.getCarDetail.and.returnValue(detailObs);
    shoppingCartSpy = createSpyObj('ShoppingCartService', [ 'addItem']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: CarService, useValue: serviceSpy },
        { provide: ShoppingCartService, useValue: shoppingCartSpy } ],
      declarations: [ CarDetailComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve car detail', () => {
    expect(serviceSpy.getCarDetail).toHaveBeenCalled();
  });

  it('should save the car in the shopping cart', () => {
    component.addToCart({
        licensed: true,
        price: 10000,
        brand: 'Cadillac',
        model: 'Calais V8',
        plateNumber: 'CWS999T',
        manufactureDate: null,
        acquisitionDate: null
      } as CarItem);
    expect(shoppingCartSpy.addItem).toHaveBeenCalled();
  });

});
