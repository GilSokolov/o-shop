import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from './../models/app-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  categories$: Observable<Category[]> = this.categories.asObservable();

  constructor(private db: AngularFirestore) {
    this.getAll();
  }

  getAll(): void {
    this.db.collection<Category>('/categories', ref => ref.orderBy('name'))
    .valueChanges().subscribe(categories => this.categories.next(categories));
  }

}
