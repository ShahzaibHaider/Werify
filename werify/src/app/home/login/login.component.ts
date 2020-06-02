import { Component, OnInit } from '@angular/core';
import { Recipient } from 'src/app/models/recipient';
import { Organization } from 'src/app/models/organization';
import { RecipientService } from 'src/app/services/recipient.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_type: number = 0;
  rec = new Recipient(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  org = new Organization(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

  constructor(private recService: RecipientService, private orgService: OrganizationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onSubmit(formdata: NgForm) {
    if (this.user_type == 1) {
      this.rec.password = formdata.value["password"];
      this.rec.username = formdata.value["username"];

      this.recService.signin(this.rec).subscribe(
        data => {
          if (data["message"] == "Success") {
            localStorage.setItem("Rtoken", data["token"]);
            localStorage.setItem("Rusername", this.rec.username);
            this.router.navigate(['recipient/'.concat(this.rec.username)]);
          } else {
            Swal.fire('Wrong Credientials', data["message"], "error");
          }
        },
        error => console.error(error)
      );

    } else if (this.user_type == 2) {
      this.org.password = formdata.value["password"];
      this.org.username = formdata.value["username"];

      this.orgService.signin(this.org).subscribe(
        data => {
          if (data["message"] == "Success") {
            localStorage.setItem("Otoken", data["token"]);
            localStorage.setItem("Ousername", this.org.username);
            this.router.navigate(['issuer/'.concat((this.org.username))]);
          } else {
            Swal.fire('Wrong Credientials', data["message"], "error")
          }
        },
        error => console.error(error)
      );
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: 'User not selected' })
    }
  }
}
