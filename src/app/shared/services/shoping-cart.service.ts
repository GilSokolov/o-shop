import { Product } from 'shared/models/app-product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { ShopingCart } from 'shared/models/app-shoping-cart';
import { Observable, BehaviorSubject } from 'rxjs';
import { DocToMap, firePayload } from '../../helpers/firebase';

interface ShopingCartDoc {
  items: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {
  private cartsCollection: AngularFirestoreCollection<any>;
  private cart: BehaviorSubject<ShopingCart> = new BehaviorSubject(new ShopingCart({}));
  readonly cart$: Observable<ShopingCart> = this.cart.asObservable();


  constructor(private db: AngularFirestore) {
    this.cartsCollection = this.db.collection('shoping-carts');
    this.init();
  }

  async init() {
    const cart = await this.getCart();
    return cart.collection('items')
      .snapshotChanges()
      .pipe(map(DocToMap))
      .subscribe(item => this.cart.next(new ShopingCart(item)));
  }

  private create() {
    return this.cartsCollection.add({
      dateCreated: new Date().getTime()
    });
  }

  private async getCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
// tslint:disable-next-line: curly
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async getCart(): Promise<AngularFirestoreDocument<ShopingCartDoc>> {
    const id = await this.getCartId();
    return this.cartsCollection.doc(id);
  }

  async getItems(): Promise<Observable<ShopingCart>> {
    return Promise.resolve(this.cart$);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cart$ = await this.getCart();
    const items$ = cart$.collection('items');

    items$.snapshotChanges().pipe(take(1)).pipe(map(firePayload)).subscribe(docs => {
      docs.forEach(doc => items$.doc(doc.id).delete());
    });
  }

  private async getItemById(id: string): Promise<AngularFirestoreDocument<any>> {
    const cart = await this.getCart();
    return cart.collection('items').doc(id);
  }

  private async updateItem(product: Product, change: number) {
    const item$ = await this.getItemById(product.id);

    item$.valueChanges().pipe(take(1)).subscribe(item => {
      const quantity = ((item) ? item.quantity : 0) + change;
      if (quantity === 0 ) {
        item$.delete();
      } else {
        item$.set({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity});
      }
    });
  }
}
