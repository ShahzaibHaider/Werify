import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Feedback } from 'src/app/models/feedback';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  private feedbacks: Feedback[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.GetFeedbacks().subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data["docs"];
      },
      err => { console.log(err) }
    )
  }
  reply(feedback: Feedback) {
    console.log(feedback);
    this.adminService.Reply(feedback).subscribe(
      data => {
        this.adminService.GetFeedbacks().subscribe(
          (data: Feedback[]) => {
            this.feedbacks = data["docs"];
          },
          err => { console.log(err) }
        )
      },
      err => { console.log(err) }
    )

  }

}
