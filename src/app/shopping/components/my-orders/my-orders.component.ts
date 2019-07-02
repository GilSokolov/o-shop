import { AuthFireService } from 'shared/services/auth-fire.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable, of } from 'rxjs';
import { Order } from 'shared/models/app-order';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(
    private orderService: OrderService, 
    private auth: AuthFireService) { }

  ngOnInit() {
    this.orders$ = this.auth.appUser$.pipe(switchMap(user => {
      if (!user) { return of(null); }
      return this.orderService.getOrderById(user.id);
    }));
  }

}

