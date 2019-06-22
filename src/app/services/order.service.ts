import { AuthFireService } from './auth-fire.service';
import { ShopingCartService } from './shoping-cart.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Order } from '../models/app-order';
import { firePayload, FireDoc } from '../helpers/firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFirestore,
    private shopingCartService: ShopingCartService,
    private auth: AuthFireService) { }

  async placeOrder(order: Order): Promise<DocumentReference> {
    const result = await this.db.collection('orders').add({...order});
    this.shopingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<FireDoc[]> {
    return this.db.collection('orders').snapshotChanges().pipe(map(firePayload));
  }

  getOrderById(id: string): Observable<Order[]> {
    return this.db.collection<Order>('orders', ref => ref.where('userId', '==', id))
    .valueChanges();
  }
}
