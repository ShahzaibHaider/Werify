import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { RecipientService } from 'src/app/services/recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  private applications: Application[] = [];
  constructor(private recService: RecipientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recService.ApplicationsByRecipient().subscribe(
      (data: Application[]) => {
        this.applications = data["docs"];
      },
      err => { console.log(err) }
    )
  }
  GotoJob(id: string) {
    this.router.navigate(['recipient/'.concat(localStorage.getItem("Rusername").concat("/find_jobs/".concat(id)))]);
  }

  DeleteApplication(job: string, username: string) {
    this.recService.DeleteApplication(job, username).subscribe(
      (data: Application[]) => {
        this.applications = data["docs"];
        if (data["message"] == "success") {
          Swal.fire("Successfully", "Application Deleted Successfully", "success");
        }
      },
      err => { console.log(err) }
    );
  }

}
