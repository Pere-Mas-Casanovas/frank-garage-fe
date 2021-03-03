import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarItem} from '../../services/car.service';
import {ShoppingCartComponent} from './shopping.cart.component';
import {ShoppingCartService} from '../../services/shopping.cart.service';
import {Subject} from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('shopping.cart.component', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let serviceSpy: SpyObj<ShoppingCartService>;

  beforeEach(() => {
    serviceSpy = createSpyObj('ShoppingCartService', ['loadItems', 'addItem', 'removeItem']);
    serviceSpy.cartItems$ = new Subject<CarItem[]>().asObservable();
    TestBed.configureTestingModule({
      providers: [ { provide: ShoppingCartService, useValue: serviceSpy } ],
      declarations: [ ShoppingCartComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load existing items', () => {
    expect(serviceSpy.loadItems).toHaveBeenCalled();
  });

  it('should call the service to remove an item', () => {
    component.removeItem({
      licensed: true,
      price: 10000,
      brand: 'Cadillac',
      model: 'Calais V8',
      plateNumber: 'CWS999T',
      manufactureDate: null,
      acquisitionDate: null
    } as CarItem);
    expect(serviceSpy.removeItem).toHaveBeenCalled();
  });
});
