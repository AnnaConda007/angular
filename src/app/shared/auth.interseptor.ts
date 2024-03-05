import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuth()) {
      const token = this.auth.token; // Получаем токен
      if (token) {
        // Клонируем запрос только если токен существует
        req = req.clone({
          setParams: {
            auth: token,
          },
        });
      }
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Если пользователь не аутентифицирован, выполняем выход и перенаправляем на страницу входа
          this.auth.logout();
          this.router.navigate(['/admin', 'login']);
        }
        // Перенаправляем ошибку дальше
        return throwError(() => error);
      })
    );
  }
}
