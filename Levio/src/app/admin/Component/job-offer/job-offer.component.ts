import { Component, OnInit } from '@angular/core';
import {JobOffer, Skill} from '../../models/JobOffer';
import {JobOfferService} from '../../services/job-offer.service';
import {stringify} from 'querystring';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {ApplicationService} from '../../services/application.service';
import {Application} from '../../models/Application';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css'],
  providers: [JobOfferService, ApplicationService]
})
export class JobOfferComponent implements OnInit {
  filtertext: Application = new Application();
  listApplication: Application[] = [];
  dropdownList = [];
  selectedItems = [];
  selectedItemsupdate = [];
  dropdownSettings = {};
  registerForm: FormGroup;
  submitted = false;
jobOffer: JobOffer[] = [];
JobOfferadd: JobOffer = new JobOffer();
  jobOfferUpdate: JobOffer = new JobOffer();
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private service: JobOfferService, private serviceApp: ApplicationService, public ngxSmartModalService: NgxSmartModalService, private formBuilder: FormBuilder) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.dropdownList = [
      { id: 1, name: 'PHP' },
      { id: 2, name: 'MySQL' },
      { id: 3, name: 'Oracle' },
      { id: 4, name: 'Angular' },
      { id: 5, name: 'VueJS' },
      { id: 6, name: 'React' },
      { id: 7, name: 'Symfony' },
      { id: 8, name: 'Laravel' },
      { id: 9, name: 'Cisco' },
      { id: 10, name: 'Linux' },
      { id: 11, name: 'JQuery' },
      { id: 12, name: 'CSS' },
      { id: 13, name: 'HTML' },
      { id: 14, name: 'Unity' },
      { id: 15, name: 'ASP' },
      { id: 16, name: 'JavaEE' },
      { id: 17, name: 'Swing' },
      { id: 18, name: 'iOS' }

    ];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.registerForm = this.formBuilder.group({

      function: ['', [Validators.required] ],
      date: ['', [Validators.required]],
      mission: ['', [Validators.required, Validators.minLength(8)]],
      profil: ['', [Validators.required, Validators.minLength(8)]],
      nbposte: ['', [Validators.required]],
      experience: ['', Validators.required]
    });
this.service.getAllJobOffer().subscribe(res => this.jobOffer = (res));
this.serviceApp.getAllApplication().subscribe(res => this.listApplication = (res));
  }
  get f() { return this.registerForm.controls; }
  calProgress(length: number, nbPoste: number) {
   // console.log(length / nbPoste);
    return String((length / nbPoste) * 100) + '%';
  }

  AddJobOffer() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('invalid');
    } else {
      console.log(this.JobOfferadd);
      this.service.addJobOffer(this.JobOfferadd).subscribe(res => console.log('aaaa'));
      this.JobOfferadd.listApplicant = [];
      this.jobOffer.push(this.JobOfferadd);
this.ngxSmartModalService.getModal('myModal').close();
      this.notifier.show( {
        type: 'success',
        message: 'Job offer added',
        id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      } );

    }

  }
  onItemSelect(item: any) {
    const ss = new Skill();
    console.log(item.item_text);
    ss.name = item.name;
    ss.rating = 0;

    this.JobOfferadd.listSkills.push(ss);
    console.log(item);
  }
  OnItemDeSelect(item: any) {
    const index = this.JobOfferadd.listSkills.indexOf(item, 0);
    if (index > -1) {
      this.JobOfferadd.listSkills.splice(index, 1);
    }
  }
  onItemSelectupdate(item: any) {
    const ss = new Skill();
    console.log(item.item_text);
    ss.name = item.name;
    ss.rating = 0;
    console.log(ss);

    this.jobOfferUpdate.listSkills.push(ss);
    console.log(item);
  }
  OnItemDeSelectupdate(item: any) {
    const index = this.jobOfferUpdate.listSkills.indexOf(item, 0);
    if (index > -1) {
      this.jobOfferUpdate.listSkills.splice(index, 1);
    }
  }

  updatePopUp(j: JobOffer) {
    this.jobOfferUpdate = j;
    for (let _i = 0; _i < this.jobOfferUpdate.listSkills.length; _i++) {
      this.selectedItems.push({id: _i + 1, name: this.jobOfferUpdate.listSkills[_i].name});
    }
    console.log(this.selectedItems);
    this.jobOfferUpdate.listSkills = [];
    this.ngxSmartModalService.getModal('updateModal').open();


  }

  updateJobOffer() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('invalid');
    } else {
      console.log(this.JobOfferadd);
      this.service.UpdateJobOffer(this.jobOfferUpdate).subscribe(res => console.log('aaaa'));
      this.showUpdatedItem(this.jobOfferUpdate);
      this.ngxSmartModalService.getModal('updateModal').close();
      this.notifier.show( {
        type: 'success',
        message: 'Job offer updated',
        id: 'THAT_NOTIFICATION_ID' // Again, this is optional
      } );

    }
  }
  showUpdatedItem(newItem) {
    const updateItem = this.jobOffer.find(this.findIndexToUpdate, newItem.id);

    const index = this.jobOffer.indexOf(updateItem);


    this.jobOffer[index] = newItem;

  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  addj() {
    this.ngxSmartModalService.getModal('myModal').open();
    this.JobOfferadd.listSkills = [];
  }

  AfficheApp(j: JobOffer, selectstate) {
    selectstate.value = '';
this.filtertext.state = '';
    this.listApplication = j.listApplicant;
  }
  AfficheAllApplication() {

  }

  refreshAllApplication(selectstate) {
    selectstate.value = '';
    this.filtertext.state = '';
    this.serviceApp.getAllApplication().subscribe(res => this.listApplication = (res));

  }
}
