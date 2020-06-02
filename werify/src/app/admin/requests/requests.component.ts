import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  private orgs: Organization[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.GetRequests().subscribe(
      (data: Organization[]) => {
        this.orgs = data["docs"];
      },
      err => { console.log(err) }
    )
  }
  approve(username: string) {
    this.adminService.Approve(username).subscribe(
      data => {
        this.adminService.GetRequests().subscribe(
          (data: Organization[]) => {
            this.orgs = data["docs"];
          },
          err => { console.log(err) }
        )
      },
      err => { console.log(err) }
    )
  }

}
