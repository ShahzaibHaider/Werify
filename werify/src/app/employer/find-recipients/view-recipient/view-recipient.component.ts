import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from 'src/app/models/certificate';
import { Recipient } from 'src/app/models/recipient';
import Swal from 'sweetalert2';
import { Chat } from 'src/app/models/chat';
import { HireRequest } from 'src/app/models/hire-request';


@Component({
  selector: 'app-view-recipient',
  templateUrl: './view-recipient.component.html',
  styleUrls: ['./view-recipient.component.css']
})
export class ViewRecipientComponent implements OnInit {

  private imageSrc;
  private certificates: Certificate[] = [];
  private rec: Recipient;
  private hireRequest = new HireRequest(null, localStorage.getItem("Ousername"), null, null, null, false, null);
  constructor(private recService: RecipientService, private orgService: OrganizationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var username = this.route.snapshot.paramMap.get('username');
    this.recService.recipientDetailsForOrganization(username).subscribe(
      data => {
        this.rec = data[0];
        this.imageSrc = "http://localhost:3000/assets/" + this.rec.img_path
      },
      err => { console.log(err) }
    );
    this.recService.getRecipientCertificatesForOrganization(username).subscribe(
      (data: Certificate[]) => {
        this.certificates = data["docs"];
      },
      err => { console.log(err) }
    )
  }

  sendhireRequest(username: string) {
    Swal.fire({
      title: "Send Hire Request",
      html: '<input id="swal-input1" placeholder="Enter Job Title" class="swal2-input">' +
        '<input type="number" id="swal-input2" placeholder="Enter Estimated Salary" class="swal2-input">',
      showCancelButton: true
    }).then((result) => {
      if ((<HTMLInputElement>document.getElementById("swal-input1")).value != '' && (<HTMLInputElement>document.getElementById("swal-input2")).value != '') {
        this.hireRequest.job_title = (<HTMLInputElement>document.getElementById("swal-input1")).value;
        this.hireRequest.salary = (<HTMLInputElement>document.getElementById("swal-input2")).value;
        this.hireRequest.to = this.rec.username;
        this.hireRequest.status = null;
        this.orgService.sendHireRequest(this.hireRequest).subscribe(
          data => {
            if (data["message"] == "success") {
              Swal.fire("Success", "Hire Request Sent to " + this.hireRequest.to, "success");
            } else if (data["message"] == "present") {
              Swal.fire("Unsuccessful", "There is a Pending Request to " + this.hireRequest.to, "error");
            }
          },
          err => { console.log(err) }
        )
      } else {
        Swal.fire("Error", "Fill the Job Title and Salary Field ", "error");
      }
    })

  }

  contact(username: string) {
    const chat = new Chat(null, localStorage.getItem("Ousername"), username, null, null, null, false, false, false, false, false, false);
    this.orgService.CreateChat(chat).subscribe(
      data => {
        if (data["message"] == "success") {
          this.router.navigate(['employer/'.concat(localStorage.getItem('Ousername').concat('/inbox/'.concat(data["id"])))]);
        } else if (data["message"] == 'fail') {
          this.router.navigate(['employer/'.concat(localStorage.getItem('Ousername').concat('/inbox/'.concat(data["id"])))]);
        }
      },
      err => { console.log(err) }
    )
  }
}
