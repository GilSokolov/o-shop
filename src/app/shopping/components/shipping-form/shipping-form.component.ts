import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthFireService } from 'shared/services/auth-fire.service';
import { Subscription } from 'rxjs';
import { ShopingCart } from 'shared/models/app-shoping-cart';
import { Shipping, Order } from 'shared/models/app-order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShopingCart;
  shipping: Shipping = {};
  userId: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private auth: AuthFireService) {}

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }

}
