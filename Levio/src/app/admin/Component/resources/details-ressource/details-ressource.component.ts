import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RessourceService} from '../../../services/ressource.service';
import {ActivatedRoute} from '@angular/router';
import {Ressource} from '../../../models/Ressource';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Leave} from '../../../models/Leave';
import {Skill} from '../../../models/Skill';
import {NotifierService} from 'angular-notifier';
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";


@Component({
  selector: 'app-details-ressource',
  templateUrl: './details-ressource.component.html',
  styleUrls: ['./details-ressource.component.css'],
  providers:[RessourceService]
})
export class DetailsRessourceComponent implements OnInit  {

  //calendarOptions: Options;
  vacationUp:any;
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  SkillObject = new Skill();
  skillD:any;
  private readonly notifier: NotifierService;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  id: number;
  ObjectRessource:Ressource;
  SkillsRess:any;
  constructor(notifierService: NotifierService,private ServiceRessource: RessourceService,private route:ActivatedRoute,public ngxSmartModalService: NgxSmartModalService) {
    this.notifier = notifierService;
    this.id = this.route.snapshot.params['id'];


  }


  ngOnInit() {



      this.ServiceRessource.getRessourceById(this.id).subscribe(data=> {
        this.ObjectRessource=data;
        console.log(data)});

    this.ServiceRessource.getSkillsByRessource(this.id).subscribe(data2=> {
      this.SkillsRess=data2;
      console.log(data2)});

    this.calendarOptions = {
      editable: true,
      contentHeight:500,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [

      ]
    };

      this.ServiceRessource.getEvents(this.id).subscribe(data => {
        this.events = data;
        console.log(data);
      });


  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  dayClick(model: any) {
    console.log(model);
  }
  eventClick(model: any) {
    model = {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
      // other params

    }
    this.displayEvent = model;
    console.log(model.title);
    this.ngxSmartModalService.getModal('myModal').open();
    $('#eventTitle').text(model.title);



  }

  removeEvent(id,event) {
    console.log(id);
    this.ServiceRessource.deleteLeave(id).subscribe(data => console.log('ok'));
    this.events.splice(this.events.indexOf(event), 1);
    this.ServiceRessource.getEvents(this.id).subscribe(data => {
      this.events = data;
      console.log(data);
    });
    this.ngxSmartModalService.getModal('myModal').close()

  }


  updateEvent(model: any) {

    model = {
      event:{
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
      }
    }
    this.vacationUp = {

        start:model.event.start.format('YYYY-MM-DD HH:mm:ss'),
        end:model.event.end.format('YYYY-MM-DD HH:mm:ss'),

    }
    this.ServiceRessource.updateLeave(this.vacationUp,model.event.id).subscribe(data => console.log(this.vacationUp));

  }

  updateRessource(ress) {
    this.ServiceRessource.updateRessource(ress.id,ress).subscribe(data => console.log('ok'));

  }



  addSkill(SkillObject:Skill) {

    if (SkillObject.name == 'PHP') {
      SkillObject.photo = '';
      this.ServiceRessource.addSkill(this.id, SkillObject).subscribe(data => console.log('ok'));
      this.notifier.show({
        type: 'success',
        message: 'Skill successfully added',
        id: 'THAT_NOTIFICATION_ID'
      });
      this.SkillsRess.push(SkillObject);

    }
  }

   downloadPdf()
  {
    var data = document.getElementById('pdfpart');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 150;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/JPEG ');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 25;
      pdf.text(40, 15, 'Ressources');
      pdf.addImage(contentDataURL, 'JPEG ', 25, position, imgWidth, imgHeight);
      pdf.output('contentDataURL');
      pdf.save('MYPdf.pdf'); // Generated PDF

    });
  }

  getColor(name) {

    switch (name) {
      case 'PHP':
        return 'label label-success';
      case 'Swing':
        return 'label label-danger';
      case 'Oracle':
        return 'label label-danger';
      case 'MySQL':
        return 'label label-success';
      case 'CSS':
        return 'label label-danger';
      case 'ASP':
        return 'label label-success';
      case 'Oracle':
        return 'label label-success';
      case 'iOS':
        return 'label label-danger';
      case 'Symfony':
        return 'label label-warning';
      case 'Swing':
        return 'label label-danger';
      case 'JavaEE':
        return 'label label-warning';
      case 'JQuery':
        return 'label label-warning';
      case 'VueJS':
        return 'label label-info';
      case 'Unity':
        return 'label label-info';
      case 'NodeJS':
        return 'label label-info';
      case 'Angular':
        return 'label label-info';
      case 'Linux':
        return 'label label-primary';
      case 'React':
        return 'label label-primary';
      case 'HTML':
        return 'label label-primary';
      case 'Cisco':
        return 'label label-primary';
      case 'Laravel':
        return 'label label-primary';
    }

  }

  detailsSkill(skill) {

    this.ngxSmartModalService.getModal('skillDetails').open();
    this.skillD = skill;


  }


  removeSkill(id,skillD) {
    this.ServiceRessource.removeSkill(id).subscribe(data => console.log('ok'));
    this.notifier.show( {
      type: 'success',
      message: 'Skill successfully deleted',
      id: 'THAT_NOTIFICATION_ID'
    } );
    this.SkillsRess.splice(this.SkillsRess.indexOf(skillD), 1);


  }
}


