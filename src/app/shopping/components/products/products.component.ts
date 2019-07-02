import { Product } from 'shared/models/app-product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShopingCart } from 'shared/models/app-shoping-cart';
import { ShopingCartService } from 'shared/services/shoping-cart.service';

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
