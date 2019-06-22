import { ShopingCart } from './../models/app-shoping-cart';
import { ShopingCartService } from './../services/shoping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShopingCart>;

  constructor(private shopingCartService: ShopingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shopingCartService.getItems();
  }

  clearCart() {
    this.shopingCartService.clearCart();
  }

}
