import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'fittrack_token';
  private userKey = 'fittrack_user';

  constructor(private http: HttpClient, private router: Router) {}

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data);
  }

  saveAuth(response: AuthResponse) {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.role === 'admin';
  }

  isMember(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.role === 'member';
  }
}
