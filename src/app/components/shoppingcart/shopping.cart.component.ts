import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarItem} from '../../services/car.service';
import {ShoppingCartService} from '../../services/shopping.cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping.cart.html',
  styleUrls: [ './shopping.cart.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  items: CarItem[] = [];
  private cartItemsSub: Subscription;

  constructor(private service: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.cartItemsSub = this.service.cartItems$.subscribe((data) => {
      this.items = data;
    });
    this.service.loadItems();
  }

  removeItem(item: CarItem): void {
    this.service.removeItem(item);
  }

  get totalCartPrice$(): number {
    return this.items.reduce((total: number, item: CarItem) => total + item.price, 0);
  }

  ngOnDestroy(): void {
    if (this.cartItemsSub) {
      this.cartItemsSub.unsubscribe();
    }
  }




}
