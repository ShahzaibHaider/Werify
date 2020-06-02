import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  private chats: Chat[] = [];
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.orgService.getChats().subscribe(
      (data: Chat[]) => {
        this.chats = data["docs"];
      },
      err => { console.log(err) }
    )
  }

}
