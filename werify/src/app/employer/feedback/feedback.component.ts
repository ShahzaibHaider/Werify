import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import Swal from 'sweetalert2';
import { OrganizationService } from 'src/app/services/organization.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  private feedback = new Feedback(null, null, null, null, "Organization", null, null);
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
  }

  onSubmit(formdata: NgForm) {
    this.feedback.desc = formdata.value["desc"];
    this.feedback.category = formdata.value["category"];
    this.feedback.replied = false;
    this.orgService.feedback(this.feedback).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Feedback Submitted Successfully", "success")
        } else {
          Swal.fire("Error", data["message"], "error");
        }
      },
      err => { console.log(err) }
    )
  }

}
