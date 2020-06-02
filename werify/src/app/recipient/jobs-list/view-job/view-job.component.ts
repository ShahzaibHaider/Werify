import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Job } from 'src/app/models/job';
import { Router, ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { Application } from 'src/app/models/application';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  private imageSrc: string;
  private application = new Application(null, null, null, null, null, null, null);
  private job = new Job(null, null, null, null, null, null, null, null, null, null, null, null);
  private org = new Organization(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  constructor(private recService: RecipientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    var job_id = this.route.snapshot.paramMap.get('job_id');
    this.recService.GetJob(job_id).subscribe(
      data => {
        if (data["message"] == "success") {
          this.job = data["docs"];
          this.recService.GetOrganizationDetail(this.job.user).subscribe(
            data => {
              if (data["message"] == "success") {
                this.org = data["docs"][0];
              } else {
                console.log(data["message"]);
              }
            },
            err => { console.log(err) }
          )
        } else {
          console.log(data["message"]);
        }
      },
      err => { console.log(err) }
    )
  }


  ApplyOnJob(id: string) {
    this.application.job = id;
    this.recService.ApplicationOnJob(this.application).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Application Submitted Successfully", "success")
        } else {
          Swal.fire("Error", data["message"], "error")
        }
      },
      err => { console.log(err) }
    )
  }

}
