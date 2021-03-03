import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {ShoppingCartService} from './shopping.cart.service';

describe('shopping.cart.service', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartService]
    }).compileComponents();
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the items list observable initialized', () => {
    expect(service.cartItems$).toBeInstanceOf(Observable);
  });
});
