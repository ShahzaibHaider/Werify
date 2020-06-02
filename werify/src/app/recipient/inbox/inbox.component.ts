import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { RecipientService } from 'src/app/services/recipient.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {



  private chats: Chat[] = [];
  constructor(private recService: RecipientService) {
  }

  ngOnInit() {
    this.recService.getChats().subscribe(
      (data: Chat[]) => {
        this.chats = data["docs"];
      },
      err => { console.log(err) }
    )
  }

}
