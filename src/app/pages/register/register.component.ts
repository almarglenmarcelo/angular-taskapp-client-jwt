import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@models/user';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(
      private userService: UserService,
      private router: Router
      ) { } 

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.register(this.user).subscribe({
      next: this.registerSuccess.bind(this),
      error: this.registerFailed.bind(this)
    });
  }

  registerSuccess(response: Record<string, any>) {
    Swal.fire('Register Success!', 'You can now login using your new account!', 'success')
      .then((response) => {
        if(response.isConfirmed) {
          this.router.navigate(['login']);
        }
      });
  }

  registerFailed(response: Record<string, any>){

    let data: Record<string, any> = response['error'];

    if(data['result'] == 'username_already_exists') {
      Swal.fire('Register Failed', 'Username already exists', 'error');
    }
  }
}
