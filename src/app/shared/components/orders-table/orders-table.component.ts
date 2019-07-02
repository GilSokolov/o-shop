import { Component, Input } from '@angular/core';
import { Order } from 'shared/models/app-order';
import { Observable } from 'rxjs';

@Component({
  selector: 'orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {
  @Input() orders$: Observable<Order>;
}
