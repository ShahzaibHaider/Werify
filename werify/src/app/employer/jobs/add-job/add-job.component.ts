import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  private job = new Job(null, null, null, null, null, null, null, null, null, null, null, null);
  constructor(private orgService: OrganizationService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.orgService.PostJob(this.job).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Job Posted Successfully", "success");
          this.router.navigate(['/employer/'.concat(localStorage.getItem("Ousername")).concat("/jobs")]);
        } else {
          Swal.fire("Error", data["message"], "error");

        }
      },
      err => { console.log(err) }
    )
  }

}
