import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { Job } from 'src/app/models/job';
import { RecipientService } from 'src/app/services/recipient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-employer',
  templateUrl: './view-employer.component.html',
  styleUrls: ['./view-employer.component.css']
})
export class ViewEmployerComponent implements OnInit {

  private imageSrc;
  private jobs: Job[];
  private org: Organization;
  constructor(private recService: RecipientService, private orgService: OrganizationService, private route: ActivatedRoute) { }

  ngOnInit() {
    var username = this.route.snapshot.paramMap.get('username');
    this.orgService.orgDetailsForRecipient(username).subscribe(
      data => {
        this.org = data[0];
        this.imageSrc = "http://localhost:3000/assets/" + this.org.img_path
      },
      err => { console.log(err) }
    );
    this.orgService.GetJobForOrganizationForRecipient(username).subscribe(
      (data: Job[]) => {
        this.jobs = data["docs"];
      },
      err => { console.log(err) }
    )
  }

}
