import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'shared/models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private itemsCollection: AngularFirestoreCollection<Product>;
  private products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  readonly products$: Observable<Product[]> = this.products.asObservable();

  constructor(private db: AngularFirestore) {
    this.itemsCollection = this.db.collection('products');
    this.itemsCollection.valueChanges().subscribe(products => {
      this.products.next(products);
    });
  }

  create(product: Product): Promise<void> {
    const id = this.db.createId();
    return this.itemsCollection.doc<Product>(id).set(product);
  }

  getAll(): Observable<Product[]> {
    return this.products$;
  }

  getById(id: string): Observable<Product> {
    return this.db.doc<Product>(`products/${id}`).valueChanges();
  }

  update(id: string, product: Product): Promise<void> {
    return this.db.doc<Product>(`products/${id}`).update({ ...product, id });
  }

  delete(id: string) {
    return this.db.doc<Product>(`products/${id}`).delete();
  }
}
