import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  create(product: any) {
    return this.http
      .post(
        'https://angular-b4468-default-rtdb.firebaseio.com/products.json',
        product
      )
      .pipe(
        map((res: any) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date),
          };
        })
      );
  }

  getll(): Observable<Product[]> {
    return this.http
      .get<{ [key: string]: Product }>(
        'https://angular-b4468-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((res: { [key: string]: Product }) => {
          return Object.keys(res).map((key) => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date),
          }));
        })
      );
  }

  getById(id: string): Observable<Product> {
    return this.http
      .get<Product>(
        `https://angular-b4468-default-rtdb.firebaseio.com/products/${id}.json`
      )
      .pipe(
        map((res: Product) => {
          return {
            ...res,
            id: id, // Убедитесь, что id присутствует в объекте, если он не возвращается сервером
            date: new Date(res.date), // Преобразуйте строку даты в объект Date, если это необходимо
            // Обработайте другие поля, если требуется
          };
        })
      );
  }

  remoove(id: string) {
    return this.http.delete(
      `https://angular-b4468-default-rtdb.firebaseio.com/products/${id}.json`
    );
  }

  update(product: Product) {
    return this.http.patch(
      `https://angular-b4468-default-rtdb.firebaseio.com/products/${product.id}.json`,
      product
    );
  }
}
interface Product {
  id: string;
  date: Date;
  // Другие поля, которые есть у продукта
  name: string;
}
