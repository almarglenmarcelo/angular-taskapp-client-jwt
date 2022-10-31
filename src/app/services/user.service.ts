import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseUrl: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  login(username: string, password:string): Observable<Object> {
    return this.http.post(this.baseUrl + '/login', { username, password });
  }

  
  register(user : User): Observable<Object> {
    return this.http.post(this.baseUrl + '/register', user);
  }


}
