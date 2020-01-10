import {AfterViewInit, Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, AfterViewInit{
  @Input()
  check: boolean;
  constructor(
    private router:Router) { }
   ngOnInit() {
    if(localStorage.getItem('email') != null) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/login');
    }
//  this.router.navigate(['/admin']);
  
   }
   ngAfterViewInit() {

  }
}
