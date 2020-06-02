import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  private jobs: Job[];
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.orgService.GetJobForOrganization().subscribe(
      (data: Job[]) => {
        this.jobs = data["docs"];
      },
      err => { console.log(err) }
    )
  }
  RetractJob(id: string) {
    this.orgService.RetractJob(id).subscribe(
      data => {
        if (data["message"] == "success") {
          this.orgService.GetJobForOrganization().subscribe(
            (data: Job[]) => {
              this.jobs = data["docs"];
            },
            err => { console.log(err) }
          )
          Swal.fire("Successfull", "Job Retracted", "success");
        } else {
          Swal.fire("Error", data["message"], "error")
        }
      },
      err => { console.log(err) }
    )
  }
  UnRetractJob(id: string) {
    this.orgService.UnRetractJob(id).subscribe(
      data => {
        if (data["message"] == "success") {
          this.orgService.GetJobForOrganization().subscribe(
            (data: Job[]) => {
              this.jobs = data["docs"];
            },
            err => { console.log(err) }
          )
          Swal.fire("Successfull", "Job UnRetracted", "success");
        } else {
          Swal.fire("Error", data["message"], "error")
        }
      },
      err => { console.log(err) }
    )
  }


}
