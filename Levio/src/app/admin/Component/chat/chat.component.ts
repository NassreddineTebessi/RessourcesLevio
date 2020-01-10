declare var window: any;
import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  message: string;
  messages: any[] = [];
  fullName: string = localStorage.getItem('fname')+' '+localStorage.getItem('lname')+': ';
  currendDate: Date;
  listUsers: any[] = [];
  filteredFullName = localStorage.getItem('fname')+' '+localStorage.getItem('lname');
  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    this.currendDate = new Date();
    $(function () {
        const msg = $('.message').first().clone();
        msg.find('p').text($('input').val().toString());
        msg.prependTo('.chat-container');
        $('input').val('');

    });
    this.chatService.sendMessage({'user': this.fullName, 'message': this.message, 'filteredName': this.filteredFullName});
    this.message = '';
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        this.messages.push(message);
      });
    this.chatService
      .newUser(this.fullName);

    this.chatService
      .getUsers()
      .subscribe((users: any) => {
        this.listUsers = users;
      });
    //console.log(this.listUsers);

  }

  ngAfterViewInit() {
    window.componentHandler.upgradeDom();

    window.componentHandler.upgradeAllRegistered();
  }
}
