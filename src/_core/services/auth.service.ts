import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _url = 'https://reqres.in';


  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this._url}/api/users`, user);
  }

  login(account: any): Observable<any> {
    return this.http.post<string>(`${this._url}/api/login`, account);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
  }

}
