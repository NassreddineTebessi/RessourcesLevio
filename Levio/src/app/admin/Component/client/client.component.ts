import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {HttpClient} from "@angular/common/http";
import {Client} from "../../models/Client";
import {NgxSmartModalService} from "ngx-smart-modal";
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private clientService : ClientService, private http : HttpClient, public ngxSmartModalService: NgxSmartModalService) {
    this.notifier = notifierService;
  }

  clients: Client[] = null;

  ngOnInit() {
    this.clientService.getAllClients().subscribe(data => { this.clients=data});
  }

  client: Client = new Client();
  addClient(c){
    this.clientService.addClient(c).subscribe(data => console.log('ok'));
    this.clientService.getAllClients().subscribe(data => { this.clients=data});
    this.notifier.show( {
      type: 'success',
      message: 'Client successfully created',
      id: 'THAT_NOTIFICATION_ID'
    } );
  }

  deleteClient(id){
    this.clientService.deleteClient(id).subscribe(data => console.log('ok'));
    this.clientService.getAllClients().subscribe(data => { this.clients=data});
    this.notifier.show( {
      type: 'success',
      message: 'Client successfully deleted',
      id: 'THAT_NOTIFICATION_ID'
    } );
  }

}
