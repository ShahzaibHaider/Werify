import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Recipient } from 'src/app/models/recipient';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  private orgs: Organization[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.GetOrganizations().subscribe(
      (data: Organization[]) => {
        this.orgs = data["docs"];
      },
      err => { console.log(err) }
    )
  }
}
