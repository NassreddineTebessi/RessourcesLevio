import * as $ from 'jquery';
declare var window: any;
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../admin/models/User';
declare var require: any;
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, AfterViewChecked {
  currentUser: User = new User();
  check: boolean;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.check = false;
  }

  ngOnInit() {
  }
  checkLogin() {
    const email = $('.email').val();
    const pass = $('.pass').val();
    this.httpClient.get('/map-web/map/User/login?email='+email+'&password='+pass).subscribe((data: any) => {
      if (data.email !== null) {
        this.currentUser = data;
        localStorage.setItem('id', this.currentUser.id.toString());
        localStorage.setItem('email', this.currentUser.email.toString());
        localStorage.setItem('fname', this.currentUser.first_name.toString());
        localStorage.setItem('lname', this.currentUser.last_name.toString());
        localStorage.setItem('role', this.currentUser.role.toString());
        alertify.logPosition('bottom right').success('You have logged in successfully!');
        this.check = true;
        if (localStorage.getItem('role').toString() != 'ROLE_CLIENT') {
        this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/front');
        }
      } else {
        alertify.logPosition('bottom right').error('Wrong credentials!');
      }
    });
  }
  ngAfterViewInit() {
  }
  ngAfterViewChecked() {
  }
}
