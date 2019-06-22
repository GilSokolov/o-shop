import { ShopingCartService } from './../services/shoping-cart.service';
import { Product } from 'src/app/models/app-product';
import { Component, Input } from '@angular/core';
import { ShopingCart } from '../models/app-shoping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions = true;
  @Input() shopingCart: ShopingCart;

  constructor(private cartService: ShopingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
