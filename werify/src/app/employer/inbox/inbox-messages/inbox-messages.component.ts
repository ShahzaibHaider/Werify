import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io-client';
import { Chat } from 'src/app/models/chat';
import { OrganizationService } from 'src/app/services/organization.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-inbox-messages',
  templateUrl: './inbox-messages.component.html',
  styleUrls: ['./inbox-messages.component.css']
})

export class InboxMessagesComponent implements OnInit {
  private socket: any;
  private message = "";
  private chat: Chat;

  constructor(private orgService: OrganizationService, private route: ActivatedRoute) {
    this.socket = io.connect("http://localhost:3000");
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      var chat_id = routeParams.inbox_id;
      this.orgService.getChat(chat_id).subscribe(
        data => {
          this.chat = data["docs"];
          this.chat.messages = [];
        },
        err => {
          console.log(err);
        }
      )
    });

    this.socket.on('mes_from_rec', (data: any) => {
      let sender = data.msg["sender"];
      let reciever = data.msg["reciever"];
      if (sender == this.chat.recipient && reciever == this.chat.organization) {
        var incoming_message = data.msg["message"]["message_text"];
        this.addMessage(incoming_message, "recipient");
      }
    });
  }

  SendMessage() {
    if (this.message == "") {
      alert("Cannot Send Empty Message");
    } else {
      const mes = new Message(null, "organization", this.message, null, "text-message", null);
      this.addMessage(mes.message_text, "organization");
      this.message = "";
      this.socket.emit('mes_from_org', {
        message: mes,
        sender: this.chat.organization,
        reciever: this.chat.recipient
      });
    }
  }

  addMessage(text: string, user: string) {
    this.chat.messages.push(new Message(null, user, text, null, "text-message", new Date()));
  }

}