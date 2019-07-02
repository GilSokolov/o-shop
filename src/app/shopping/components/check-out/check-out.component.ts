import { Observable } from 'rxjs';
import { ShopingCart } from 'shared/models/app-shoping-cart';
import { ShopingCartService } from 'shared/services/shoping-cart.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShopingCart>;

  constructor(private shopingCart: ShopingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shopingCart.getItems();
  }
}
