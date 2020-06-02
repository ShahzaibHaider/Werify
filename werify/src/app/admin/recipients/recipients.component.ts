import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Recipient } from 'src/app/models/recipient';
@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {

  private recs: Recipient[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.GetRecipients().subscribe(
      (data: Recipient[]) => {
        this.recs = data["docs"];
      },
      err => { console.log(err) }
    )
  }

}
