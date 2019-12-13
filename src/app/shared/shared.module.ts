import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { SortableDirective } from './directives/sortable.directive';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersTableComponent,
    SortableDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    CustomFormsModule,
    RouterModule
  ],
  exports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersTableComponent,
    SortableDirective,
    AngularFirestoreModule,
    AngularFireAuthModule,
    CustomFormsModule,
  ]
})
export class SharedModule { }
