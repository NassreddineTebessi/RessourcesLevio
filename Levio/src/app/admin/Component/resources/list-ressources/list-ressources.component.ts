import { Component, OnInit } from '@angular/core';
import {RessourceService} from '../../../services/ressource.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Ressource} from '../../../models/Ressource';
import {HttpClient} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import {Mandat} from '../../../models/Mandat';
declare var $: any;

@Component({
  selector: 'app-list-ressources',
  templateUrl: './list-ressources.component.html',
  styleUrls: ['./list-ressources.component.css'],
  providers:[RessourceService]

})
export class ListRessourcesComponent implements OnInit {


  ress: Ressource[]=[];
  cols: any[];
  selectedFile = null;
  ObjectRessource = new Ressource();
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,private ServiceRessource:RessourceService,public ngxSmartModalService: NgxSmartModalService,private http:HttpClient) {

    this.notifier = notifierService;


  }

  ngOnInit() {

    this.cols = [
      { field: 'first_name', header: 'First Name ' },
      { field: 'last_name', header: 'Last Date' },
      { field: 'contract_type', header: 'Contract Type' },
      { field: '', header: 'Actions' }
    ];

    this.ServiceRessource.getRessources().subscribe(data=> {

        this.ress=data;
        console.log(data);

 });

  }

  addRessource(ObjectRessource) {

    this.ServiceRessource.addRessource(ObjectRessource).subscribe(data => console.log('ok'));
    this.notifier.show( {
      type: 'success',
      message: 'Ressource successfully added',
      id: 'THAT_NOTIFICATION_ID'
    } );
    this.ress.push(ObjectRessource);



  }


  deleteRessource(id,ressource) {

    console.log(id);
    this.ServiceRessource.deleteRessource(id).subscribe(data => console.log('ok'));
    this.notifier.show( {
      type: 'success',
      message: 'Ressource successfully deleted',
      id: 'THAT_NOTIFICATION_ID'
    } );
    this.ress.splice(this.ress.indexOf(ressource), 1);

  }


}
