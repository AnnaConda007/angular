import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../../product/product.component';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  constructor(private productServe: ProductService) {}
  products$!: Observable<Product[]>;

  ngOnInit() {
    this.products$ = this.productServe.getll();
  }
}
interface Product {
  id: string;
  date: Date;
  // Другие поля, которые есть у продукта
  name: string;
}
