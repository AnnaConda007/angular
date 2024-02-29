import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(User: { email: string; password: string }) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5f9LJ9CAI9N4ihtmvVRBrO_vINSozAkc',
        User
      )
      .pipe(tap(this.setToken));
  }

  private setToken(response: any) {
    if (response) {
      const expData = new Date(
        new Date(new Date().getTime() + +response.expiresIn * 1000)
      );
      localStorage.setItem('frBase-exp', expData.toString());
      localStorage.setItem('frBase-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const token = localStorage.getItem('frBase-token');
    if (!token) return;
    const expData = new Date(token);
    if (new Date() > expData) {
      this.logout();
      return null;
    }
    return localStorage.getItem('frBase-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuth() {
    return !!this.token;
  }
}
