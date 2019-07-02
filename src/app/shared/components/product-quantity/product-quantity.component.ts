import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/app-product';
import { ShopingCart } from 'shared/models/app-shoping-cart';
import { ShopingCartService } from 'shared/services/shoping-cart.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class ProductQuantityComponent {
  @Input() product: Product;
  @Input() shopingCart: ShopingCart;

  constructor(private cartService: ShopingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
