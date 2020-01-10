import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../services/application.service';
import {Application, State} from '../../../models/Application';
import {StateInterview} from '../../../models/Interview';

@Component({
  selector: 'app-application-back',
  templateUrl: './application-back.component.html',
  styleUrls: ['./application-back.component.css'],
  providers: [ApplicationService]
})
export class ApplicationBackComponent implements OnInit, OnChanges, AfterViewInit {
  a = true;
  application: Application = new Application();
  id: number;
  private sub: any;
  classTab = 1;
  b = true;

  constructor(private route: ActivatedRoute, private service: ApplicationService) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.service.getApplication(this.id).subscribe(res => this.application = (res));
    console.log(this.application);
  }

  calculrating(rating: number) {
    return String(rating) + '%';
  }

  accord(number: number) {
    this.classTab = number;
  }

  notif(application: Application) {
    if (application.listInterview === undefined ) {
      return true;
    } else if (application.state === 'notApplay' || application.state === 'testTech') {
      return true;
    } else {
      for (const i of this.application.listInterview) {
        if (i.stateInterview !== StateInterview.Request) {
          return true;
        }
      }
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit(): void {
  }

  notifTest(application: Application) {
    if (this.application.state === 'interview' && this.application.listTest.length === 0) {
return true;
    } else if (this.application.state === 'interviewTech' && this.application.listTest.length === 1) {
      return true;
    } else { return false; }
  }
}

