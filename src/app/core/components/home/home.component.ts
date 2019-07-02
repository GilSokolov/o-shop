import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/app-product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any[] = [{
    name: 'All Categories',
    id: ''
  }];
  selectedCategory = '';
  products: Product[];
  filteredProducts: Product[];
  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {
    this.categoryService.getAll().subscribe(c => this.categories = this.categories.concat(c));
    this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      const params = this.route.snapshot.queryParams;
      if (params.category) {
        this.onSelect({ id: params.category });
      }
    });
  }

  ngOnInit() {
  }

  onSelect(category) {
    if (category.id) {
      this.selectedCategory = category.id;
      this.filteredProducts = this.products.filter(p => p.category === category.id);
    } else {
      this.selectedCategory = '';
      this.filteredProducts = this.products;
    }
  }

}
