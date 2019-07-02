import { ShopingCartService } from 'shared/services/shoping-cart.service';
import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/app-product';
import { ShopingCart } from 'shared/models/app-shoping-cart';

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
