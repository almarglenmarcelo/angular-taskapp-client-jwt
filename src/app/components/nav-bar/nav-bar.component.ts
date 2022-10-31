import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    
  username: string = localStorage.getItem('username')!;
  hasToken: boolean = (localStorage.getItem('token') !== null);
  

  constructor(
    private sessionService: SessionService, 
    private router: Router) { 

      this.sessionService.hasToken.subscribe(hasToken => {
        this.hasToken = hasToken;
        this.username = this.sessionService.getUsername();
      })
  }
  
  ngOnInit(): void {
  }


  logout(): void {
   Swal.fire(
    {
      title: 'Are you sure?',
      text: 'Are you sure, do you want to logout?',
      icon:'warning',
      showCancelButton: true
    }).then(result => {

        if(result.isConfirmed){
          this.sessionService.clear();
          this.router.navigate(['/login']);
          Swal.fire('Log out', 'You are now logged out!', 'success') 
        }
        }) 
  }

}
