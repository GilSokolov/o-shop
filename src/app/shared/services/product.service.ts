import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firePayload } from '../../helpers/firebase';
import { Product } from 'shared/models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private itemsCollection: AngularFirestoreCollection<Product>;
  constructor(private db: AngularFirestore) {
    this.itemsCollection = this.db.collection('products');
  }

  create(product: Product) {
    return this.itemsCollection.add(product);
  }

  getAll() {
    return this.itemsCollection.snapshotChanges().pipe(map(firePayload));
  }

  getById(id) {
    return this.db.doc<Product>(`products/${id}`).valueChanges();
  }

  update(id, product) {
    return this.db.doc<Product>(`products/${id}`).update(product);
  }

  delete(id) {
    return this.db.doc<Product>(`products/${id}`).delete();
  }
}
