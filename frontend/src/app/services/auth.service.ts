import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  mensaje: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth/login';
  private registerUrl = environment.apiUrl + 'auth/register';
  constructor(private http: HttpClient) {}
  login(email: string, contraseña: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.apiUrl,
      { email, contraseña },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  register(
    nombre: string,
    email: string,
    contraseña: string
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.registerUrl,
      {
        nombre,
        email,
        contraseña,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
