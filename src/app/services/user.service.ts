import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { tap } from 'rxjs';
import { ChatStore } from '../store/chat.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  prefixUrl = environment.apiUrl + '/users';

  private http = inject(HttpClient);
  private token = signal(window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '');
  private router = inject(Router);
  private store = inject(ChatStore);

  saveLocalStorageEffect = effect(() => {
    const token = this.token() || '';
    window.localStorage.setItem('token', token);
  });

  login(data: {
    username: string,
    password: string
  }) {
    return this.http.post<{token:string}>(this.prefixUrl + '/login', data).pipe(tap((res)=>{
      this.token.set(res.token);
    }));
  }

  logout(){
    this.token.set('');
    this.store.reset();
    this.router.navigate(['/login']);
  }

  resetData(){
    this.http.get(this.prefixUrl + '/reset').subscribe(()=>{
      this.token.set('');
      this.store.reset();
      this.router.navigate(['/login']);
    });
  }

  register(data: {
    username: string,
    password: string
  }) {
    return this.http.post(this.prefixUrl + '/register', data);
  };

  getUserInfo(){
    return this.http.get(this.prefixUrl + '/me');
  }

  getUsers(){
    return this.http.get(this.prefixUrl);
  }

  getToken(){
    return this.token();
  }

  isLoggedIn(){
    return !!this.token();
  }

}
