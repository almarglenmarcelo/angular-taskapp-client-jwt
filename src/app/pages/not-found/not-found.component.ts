import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
    this.notFoundAlert();
  }

  notFoundAlert(): void {
    Swal.fire('404', 'PAGE NOT FOUND', 'error');
  }


}
