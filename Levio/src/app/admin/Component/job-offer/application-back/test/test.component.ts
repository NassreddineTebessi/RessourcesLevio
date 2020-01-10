import {Component, Input, OnInit, Output} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Test} from '../../../../models/Test';
import {TypeInterview} from '../../../../models/Interview';
import {NotifierService} from 'angular-notifier';
import {TestService} from '../../../../services/test.service';
import {QuestionsService} from '../../../../services/questions.service';
import {Question} from '../../../../models/Question';
import {ApplicationService} from '../../../../services/application.service';
import {ApplicationTest} from '../../../../models/ApplicationTest';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService, QuestionsService, ApplicationService]
})
export class TestComponent implements OnInit {
  allTest: Test[] = [];
  registerForm: FormGroup;
  registerFormQ: FormGroup;
  submitted = false;
  submitted2 = false;
  addTest: Test = new Test();
  @Input()
  listTest: ApplicationTest[] = [];
  @Input()
    state: string;
  newTest = new Test();
  filterFr: Test = new Test();
  filterTech: Test = new Test();
  selDisable = false;
  allQuestion: Question[] = [];
  newQuestion: Question = new Question();
  private readonly notifier: NotifierService;
  @Input()
  idApplication: number;

  constructor(public serviceA: ApplicationService, public serviceQ: QuestionsService, public service: TestService, public ngxSmartModalService: NgxSmartModalService, private formBuilder: FormBuilder, private formBuilderQ: FormBuilder, notifierService: NotifierService) {
    this.notifier = notifierService;

  }

  ngOnInit() {
    this.filterFr.typeTest = 'French';
    this.filterFr.typeTest = 'Technical';
    this.registerForm = this.formBuilder.group({
      sel: ['', [Validators.required]],
    });
    this.registerFormQ = this.formBuilderQ.group({
      subject: ['', [Validators.required]],
      choice1: ['', [Validators.required]],
      choice2: ['', [Validators.required]],
      choice3: ['', [Validators.required]],
      choice4: ['', [Validators.required]],
      valid: ['', [Validators.required]]
    });
    this.service.getAllTest().subscribe(res => this.allTest = (res));
  }
  get f() { return this.registerForm.controls; }
  get fQ() { return this.registerFormQ.controls; }
  addt() {
    this.ngxSmartModalService.getModal('test').open();

  }

  AddTest() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('invalid');
    } else {
if (this.selDisable === true) {
  this.service.AddTest(this.newTest).subscribe(res => {
    this.newTest = res;
    this.service.assignTest(this.idApplication, this.newTest.id).subscribe(res1 => console.log(res1));
    this.serviceA.setStateApplication(this.idApplication, 'testTech').subscribe(res2 => console.log(res2));
this.state = 'testTech';
  });

} else {
  this.service.assignTest(this.idApplication, this.addTest.id).subscribe(res => console.log(res));
  this.serviceA.setStateApplication(this.idApplication, 'testFr').subscribe(res2 => console.log(res2));
  this.state = 'testFr';


}

    //  this.service.addInterview(this.interviewadd, this.idApp).subscribe(res => console.log('aaaa'));
      this.ngxSmartModalService.getModal('test').close();
      this.notifier.show( {
        type: 'success',
        message: 'Test added',
        id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      } );
      // this.interviews.push(this.interviewadd);
      this.submitted = false;


    }
}

  addNewTest(i: number) {
    this.serviceQ.getAllQuestion().subscribe(res => this.allQuestion = (res));

    // this.submitted = true;
    let date;
    date = new Date();
    this.newTest.version = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate();
    console.log(this.newTest);
if (i === 0) {
this.newTest.typeTest = 'Technical';
} else {
  this.newTest.typeTest = 'French';
}
this.allTest.push(this.newTest);
this.registerForm.get('sel').disable();
this.selDisable = true;
this.newTest.listQuestion = [];
  }

  checkch(e, q) {
    if (e.target.checked) {
this.newTest.listQuestion.push(q);
    } else {
      const index = this.newTest.listQuestion.indexOf(q, 0);
      if (index > -1) {
        this.newTest.listQuestion.splice(index, 1);
      }
    }
  }

  addQuestion() {
    this.ngxSmartModalService.getModal('question').open();
  }

  AddQuestion() {
    this.submitted2 = true;
    if (this.registerFormQ.invalid) {
      console.log('invalid');
    } else {
      if (this.newQuestion.validChoise === '1') {
this.newQuestion.validChoise = this.newQuestion.choice1;
      } else if (this.newQuestion.validChoise === '2') {
        this.newQuestion.validChoise = this.newQuestion.choice2;
      } else if (this.newQuestion.validChoise === '3') {
        this.newQuestion.validChoise = this.newQuestion.choice3;
      } else {
        this.newQuestion.validChoise = this.newQuestion.choice4;
      }
      this.serviceQ.addQuestion(this.newQuestion).subscribe(res => this.allQuestion.push(res));
      this.ngxSmartModalService.getModal('question').close();
      this.notifier.show( {
        type: 'success',
        message: 'Question added',
        id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      } );
      // this.interviews.push(this.interviewadd);
      this.submitted = false;
      this.newQuestion = new Question();
    }
  }

  progres(note: number) {
    return note.toString() + '%';
  }
}

