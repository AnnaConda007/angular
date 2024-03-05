import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  products: Product[] = [];
  pSub!: Subscription;

  constructor(private productServ: ProductService) {}

  ngOnInit() {
    this.pSub = this.productServ.getll().subscribe((products) => {
      console.log(products);
      this.products = products;
    });
  }
  OnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}

interface Product {
  id: string;
  date: Date;
  // Другие поля, которые есть у продукта
  name: string;
}
