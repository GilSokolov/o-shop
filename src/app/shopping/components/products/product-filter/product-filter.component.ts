import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/app-category';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<Category[]>;
  @Input() category: string;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.categories$;
  }

}
