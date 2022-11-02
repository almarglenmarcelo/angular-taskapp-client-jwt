import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  showAlert(): void{
    Swal.fire({
      position: 'center',
      timer: 1500,
      showConfirmButton: false,
      title: 'It Alerts You!'
    })
  }
}
