import { Component, OnInit } from '@angular/core';

import { UserService } from '@services/user.service';
import { SessionService  } from '@services/session.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(
      private router: Router,
      private userService: UserService,
      private sessionService: SessionService) { }

  ngOnInit(){
  }     
  
  onSubmit(): void{
    this.userService.login(this.username, this.password).subscribe({
      next: this.loginSuccess.bind(this),
      error: this.loginFailed.bind(this)
    });

  } 
  
  loginSuccess(response: Record<string, any>): void{
    
    this.sessionService.setToken(response['token']);
    this.sessionService.setUsername(response['username']);
    this.router.navigate(['']);
    
    Swal.fire('Login Success', 'You can now use the Task Application', 'success').then(result => {
      if(result.isConfirmed) {
        window.location.reload();
      }
    })
    

  }
  
  loginFailed(response: Record<string, any>): void{

    let data: Record<string, any> = response['error'];

    if(data['result'] == 'user_not_found') {
      Swal.fire('Login Failed', 'User account does not exists', 'error');
    }
        
  }






}
