import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import Swal from 'sweetalert2';
import { OrganizationService } from 'src/app/services/organization.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  private job = new Job(null, null, null, null, null, null, null, null, null, null, null, null);
  constructor(private orgService: OrganizationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    var job_id = this.route.snapshot.paramMap.get('job_id');
    this.orgService.GetJob(job_id).subscribe(
      data => {
        if (data["message"] = "success") {
          this.job = data["docs"];
        }
      },
      err => { console.log(err) }
    )
  }
  onSubmit() {
    this.orgService.UpdateJob(this.job).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successfull", "Job Updated Successfully", "success")
        } else {
          Swal.fire("Error", data["message"], "error")
        }
      },
      err => { console.log(err) }
    )
  }

}
