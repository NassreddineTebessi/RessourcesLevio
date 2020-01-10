import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  id: number = parseInt(localStorage.getItem('id'),null);
  firstName: string = localStorage.getItem('fname');
  lastName: string = localStorage.getItem('lname');
  email: string = localStorage.getItem('email');

  constructor(private router: Router) { }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
