import {Component, Input, OnInit} from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Inputt} from '../../../../models/Input';
import {Application} from '../../../../models/Application';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {NotifierService} from 'angular-notifier';
import {Letter} from '../../../../models/Letter';
import {LetterService} from '../../../../services/letter.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [LetterService]
})
export class FolderComponent implements OnInit {
  @Input()
  application: Application = new Application();
  private readonly notifier: NotifierService;
  registerForm: FormGroup;
  submitted = false;
  letterr: Letter = new Letter();


  constructor(private service: LetterService, private formBuilder: FormBuilder, public ngxSmartModalService: NgxSmartModalService,  notifierService: NotifierService) {

    this.notifier = notifierService;
  }



  addL() {
    this.ngxSmartModalService.getModal('letter').open();

  }

  AddLetter() {
this.submitted = true;
if (this.registerForm.invalid) {
  console.log('invalid');
}  else {
  console.log(this.letterr);
this.service.addLetter(this.letterr, this.application.folder.id).subscribe(res => {
this.letterr = res;
this.application.folder.listeLetter.push(res);
console.log(res);
});
this.ngxSmartModalService.getModal('letter').close();
  this.notifier.show( {
    type: 'success',
    message: 'Letter added',
    id: 'THAT_NOTIFICATION_ID' // Again, this is optional
  } );
}
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      salary: ['', [Validators.required, Validators.min(900)]],
    });
  }
  get f() { return this.registerForm.controls; }

}
