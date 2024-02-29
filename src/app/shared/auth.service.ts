import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(User: { email: string; password: string }) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyB5f9LJ9CAI9N4ihtmvVRBrO_vINSozAkc',
      User
    );
  }
}
