import { ShopingCartService } from './../services/shoping-cart.service';
import { Product } from './../models/app-product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShopingCart } from '../models/app-shoping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShopingCart>;

  constructor(
    private route: ActivatedRoute,
    private shopingCartService: ShopingCartService,
    private productService: ProductService) {}

  async ngOnInit() {
    this.cart$ = await this.shopingCartService.getItems();
    this.setProducts();
  }

  private setProducts() {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filterProducts();
    });
  }

  private filterProducts() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
