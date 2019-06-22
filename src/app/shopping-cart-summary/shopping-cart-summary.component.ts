import { Component, Input } from '@angular/core';
import { ShopingCart } from '../models/app-shoping-cart';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input() cart: ShopingCart;
}
