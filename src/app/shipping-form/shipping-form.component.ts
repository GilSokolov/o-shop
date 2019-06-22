import { ShopingCart } from './../models/app-shoping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AuthFireService } from '../services/auth-fire.service';
import { Subscription } from 'rxjs';
import { Order, Shipping } from '../models/app-order';

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
