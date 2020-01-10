import {Component, Input, OnInit} from '@angular/core';
import {Interview, StateInterview, TypeInterview} from '../../../../models/Interview';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {InterviewService} from '../../../../services/interview.service';
import {ApplicationService} from '../../../../services/application.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css'],
  providers: [InterviewService, ApplicationService]
})
export class InterviewsComponent implements OnInit {
  interviewadd: Interview = new Interview ();
  private readonly notifier: NotifierService;
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  testint: TypeInterview;
  @Input()
interviews: Interview[] = [];
  @Input()
  idApp: number;
  @Input()
  state: string;

  interviewupdate: Interview = new Interview();
  constructor(private appService: ApplicationService, private service: InterviewService, notifierService: NotifierService, public ngxSmartModalService: NgxSmartModalService, private formBuilder: FormBuilder) {
    this.notifier = notifierService;

  }


  ngOnInit() {
    //console.log(this.state);
    this.registerForm = this.formBuilder.group({
      date: ['', [Validators.required]],
    });
    this.registerForm1 = this.formBuilder.group({
      date: ['', [Validators.required]],
    });
  //  console.log((this.interviews.length <= 2 || this.state === 'notApplay' || this.state === 'testTech'));
  }
  get f1() { return this.registerForm1.controls; }
  get f() { return this.registerForm.controls; }

  AddInterview() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      //console.log('invalid');
    } else {
      this.interviewadd.stateInterview = StateInterview.Request;
      if (this.interviews.length === 0) {
        this.interviewadd.typeInterview = TypeInterview.interview;
        this.appService.setStateApplication(this.idApp, 'interview').subscribe(res => res);
      } else {
        this.interviewadd.typeInterview = TypeInterview.InterviewTech;
        this.appService.setStateApplication(this.idApp, 'interviewTech').subscribe(res => res);

      }

this.service.addInterview(this.interviewadd, this.idApp).subscribe(res => res);
      this.ngxSmartModalService.getModal('interview').close();
      this.notifier.show( {
        type: 'success',
        message: 'Interview added',
        id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      } );
      this.interviews.push(this.interviewadd);
      this.submitted = false;


    }
}addj() {
    this.ngxSmartModalService.getModal('interview').open();

  }

  updateInterview(i: Interview) {
    this.submitted = true;
    if (this.registerForm1.invalid) {
      //console.log('invalid');
    } else {
this.interviewupdate.stateInterview = StateInterview.Request;
      this.service.updateInterview(this.interviewupdate).subscribe(res => res);
      this.ngxSmartModalService.getModal('update').close();
      this.notifier.show({
        type: 'success',
        message: 'Interview updated',
        id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      });

      this.submitted = false;
    }}

  updatepop(i: Interview) {
    this.interviewupdate = i;
    this.interviewupdate.stateInterview = StateInterview.Request;
    this.ngxSmartModalService.getModal('update').open();

  }
}
