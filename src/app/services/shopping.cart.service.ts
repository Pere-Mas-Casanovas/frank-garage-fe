import {Injectable} from '@angular/core';
import {CarItem} from './car.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

const PURCHASED_ITEMS = 'PURCHASED_ITEMS';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public cartItems$: Observable<CarItem[]>;
  private cartItems: BehaviorSubject<CarItem[]>;

  constructor() {
    this.cartItems = new BehaviorSubject<CarItem[]>([]);
    this.cartItems$ = this.cartItems.asObservable();
  }

  public loadItems(): void {
    this.cartItems.next(this.getItems());
  }

  public emptyCart(): void {
    window.sessionStorage.removeItem(PURCHASED_ITEMS);
    this.cartItems.next([]);
  }

  public addItem(newItem: CarItem): void {
    const items = this.getItems();
    if (items.filter((item) => item.plateNumber === newItem.plateNumber).length === 0) {
      items.push(newItem);
      this.saveItems(items);
      this.cartItems.next(items);
    }
  }

  public removeItem(discardedItem: CarItem): void {
    const items = this.getItems();
    const discarded: CarItem[] = items.filter((item) => item.plateNumber === discardedItem.plateNumber);
    if (discarded.length  === 1) {
      items.splice(items.indexOf(discarded[0]), 1);
      this.saveItems(items);
      this.cartItems.next(items);
    }
  }

  private getItems(): CarItem[] {
    return JSON.parse(window.sessionStorage.getItem(PURCHASED_ITEMS)) || [];
  }

  private saveItems(items: CarItem[]): void {
    window.sessionStorage.setItem(PURCHASED_ITEMS, JSON.stringify(items));
  }
}
