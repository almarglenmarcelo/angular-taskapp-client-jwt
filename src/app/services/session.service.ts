import { Injectable, Output, EventEmitter } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
  @Output() hasToken: EventEmitter<boolean> = new EventEmitter();

  constructor() { 

    if(localStorage.getItem('token') !== null) {
      this.hasToken.emit(true);
    }else {
      this.hasToken.emit(false);
    }

  }


  getToken(): string {
    return localStorage.getItem('token')!;
  }

  getUsername(): string {
    return localStorage.getItem('username')!;
  }


  setToken(value: string): void {

    this.hasToken.emit(true);
    localStorage.setItem('token', value);

  } 

  setUsername(value: string): void {
    localStorage.setItem('username', value);
  }


  clear(): void {
    localStorage.clear();
    this.hasToken.emit(false);
  }

}
