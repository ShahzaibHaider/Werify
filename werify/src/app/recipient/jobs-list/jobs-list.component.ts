import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Job } from 'src/app/models/job';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  private jobs: Job[];
  constructor(private recService: RecipientService) { }

  ngOnInit() {
    this.recService.GetJobs().subscribe(
      (data: Job[]) => {
        this.jobs = data["docs"];
      },
      err => { console.log(err); }
    )
  }

}
