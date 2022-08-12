import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService{

  isAuth = false;
  role: string;

  constructor(private api: ApiService, private router: Router) {}

  signIn(data) {
    // localStorage.clear();
    this.isAuth = true;
    return this.api.ajouter('auth/login', data);
  }

  signOut() {
    this.isAuth = false;
    this.role = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return of({ success: this.isAuth, role: '' });
  }

  isAuthIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isAuth = true;
    else
      this.isAuth = false;
    return this.isAuth;
  }

  getRole() {
    this.role = localStorage.getItem('ROLE');
    return this.role;
  }

  getUrl() {
    if(this.role === 'COMPANY') {
      return '/compte/company';
    }
    if(this.role === 'USER') {
      return '/compte/client';
    }
  }

  register(user: any): Observable<any> {
    return this.api.ajouter('auth/register', user);
  }

  validation(data: any): Observable<any> {
    return this.api.ajouter('auth/validation', data);
  }

  setUser(id, data: any): Observable<any> {
    return this.api.ajouter('users/'+id, data);
  }
}
