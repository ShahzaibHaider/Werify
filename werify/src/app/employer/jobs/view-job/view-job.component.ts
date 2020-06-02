import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { OrganizationService } from 'src/app/services/organization.service';
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

  private job = new Job(null, null, null, null, null, null, null, null, null, null, null, null);
  private org = new Organization(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  private imageSrc: string;
  private applications: Application[];
  private application_count: string;

  constructor(private orgService: OrganizationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    var job_id = this.route.snapshot.paramMap.get('job_id');
    this.orgService.GetJob(job_id).subscribe(
      data => {
        if (data["message"] == "success") {
          this.job = data["docs"];
          this.orgService.orgDetails().subscribe(
            data => {
              this.org = data[0];
            },
            err => { console.log(err); }
          )
        } else {
          console.log(data["message"]);
        }
      },
      err => { console.log(err) }
    );

    this.orgService.ApplicationByJob(job_id).subscribe(
      (data: Application[]) => {
        this.applications = data["docs"];
        this.application_count = data["application_count"];
      },
      err => { console.log(err) }
    )
  }
  RejectApplication(job: string, username: string) {
    this.orgService.RejectApplication(job, username).subscribe(
      (data: Application[]) => {
        this.applications = data["docs"];
        if (data["message"] == "success") {
          Swal.fire("Successful", "Application Rejected Successfully", "success");
        } else {
          Swal.fire("Error", data["message"], "error");
        }
      },
      err => { console.log(err) }
    )
  }
  ViewProfile(username: string) {
    this.router.navigate(["employer/".concat(localStorage.getItem("Ousername").concat("/find_recipients/".concat(username)))]);
  }


}
