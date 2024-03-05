import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  constructor(
    private ProductService: ProductService,
    private router: ActivatedRoute
  ) {}

  product$!: Observable<Product>;
  ngOnInit() {
    this.product$ = this.router.params.pipe(
      switchMap((params) => {
        return this.ProductService.getById(params['id']);
      })
    );
  }
}
interface Product {
  id: string;
  date: Date;
  name: string;
}
