import {Client} from '../../models/Client';

declare var window: any;
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { RequestService } from '../../services/request.service';
import { HttpClient } from '@angular/common/http';
import {Request} from '../../models/Request';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import {interval} from 'rxjs/observable/interval';
import { Subscription } from 'rxjs';
import {Directive} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from '../../models/Message';
import '@angular/material';
import * as alertify from 'alertify.js';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css', './table.scss'],
  providers : [RequestService]
})
export class RequestComponent implements OnInit,AfterViewInit, AfterViewChecked {
  subscription: Subscription;
  mySource:any =  interval(1000);
  listRequests: Request[] = [];
  buldAction: boolean;
  message: Message;
  currentProfile: Client;
  request: Request;
  constructor(private httpClient: HttpClient, private rs: RequestService) {
    this.message = new Message();
    this.currentProfile = new Client();
    this.request = new Request();
  }

  returnTreatAction(request: Request) {
    if (request.status) {
      return 'close';
    }
    return 'check';
  }

  treatRequest(request: Request) {
    if (!request.status) {
      this.rs.treatRequest(request);
    this.getAllRequests();
    }
  }

    sendMessage(message: Message) {
    this.message.type = 'satisfaction';
    this.message.message = $('.msg-body').val().toString();
    this.rs.sendMessage(message);
    alertify.logPosition('bottom right').success('Your message have been sent successfully!');
    }

    deleteRequest(request: Request) {
    if (request.status) {
      this.rs.deleteRequest(request);
      this.getAllRequests();
    }
    }
  returnStatus(request: Request) {
    if (request.status) {
      return 'Treated';
    } else {
      return 'Not Treated';
    }
  }
  getAllRequests() {
    this.listRequests = this.rs.getAllRequests();
  }
  deleteTreatedRequests() {
    this.getAllRequests();
    }
  treatAllRequests() {
    for (const request of this.listRequests) {
      if (!request.status) {
        this.treatRequest(request);
      }
    }
  }

  getProfileInformation(request: Request) {
    this.currentProfile = request.clients[0];
  }
  sendMsg() {
    this.sendMessage(this.message);
  }

  getMessageDetails(request: Request) {
    this.message.toUserEmail = request.clients[0].email;
    $('#recipient-name').val(this.message.toUserEmail);
    this.message.subject = 'Request of resource for project:' + request.context;
    $('#subject').val(this.message.subject);
  }
  addRequest() {
    this.rs.addRequest(this.request);
  }
  ngOnInit() {
    this.getAllRequests();
    $('.msg-button').css('background-color','yellow');
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeDom();

    window.componentHandler.upgradeAllRegistered();
     this.subscription = this.mySource.subscribe(val => this.getAllRequests());

  }
  ngAfterViewChecked() {
    $('.msg-button').css('background-color','orange');
    $('.profile-button').css('background-color','grey');
  }

}
