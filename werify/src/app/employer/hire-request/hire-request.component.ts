import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HireRequest } from 'src/app/models/hire-request';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-hire-request',
  templateUrl: './hire-request.component.html',
  styleUrls: ['./hire-request.component.css']
})
export class HireRequestComponent implements OnInit {
  private hireRequests: HireRequest[] = [];
  constructor(private orgService: OrganizationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orgService.getHireRequests().subscribe(
      (data: HireRequest[]) => {
        this.hireRequests = data["docs"];
      },
      err => { console.log(err) }
    )
  }

}
