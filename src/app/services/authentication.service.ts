import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails, User,TokenResponse } from "../models/data-model";
import { AppService } from "./app.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  newUserUrl='/users/create'; 
  getUsersUrl='/users';
  loginUrl='/users/login';
  private token: string;
  constructor(private http: HttpClient, private router: Router,private appservice:AppService) { }
  url='';
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  public register(user: User): Observable<any> {
    this.url=this.appservice.appSettings.apiUrl
    return this.request('post', 'register', user);
  }

  public login(user: User): Observable<any> {
    this.url=this.appservice.appSettings.apiUrl
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    
    return this.request('get', 'profile');
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: User): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.url}/users/${type}`, user);
    } else {
      base = this.http.get(`${this.url}/users/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log(data);
        console.log(this.url);
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }




  private saveToken(token: string): void {
    localStorage.setItem('pyxis-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('pyxis-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('pyxis-token');
    this.router.navigateByUrl('/');
  }

}
