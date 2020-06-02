import { Component, OnInit } from '@angular/core';
import { Recipient } from 'src/app/models/recipient';
import { Organization } from 'src/app/models/organization';
import { RecipientService } from 'src/app/services/recipient.service';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user_type: number = 0;
  rec = new Recipient(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  org = new Organization(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, []);

  constructor(private recService: RecipientService, private orgService: OrganizationService) {
  }

  ngOnInit() {
  }

  onSubmit(formdata: NgForm) {
    if (this.user_type == 1) {
      this.rec.email = formdata.value["email"];
      this.rec.password = formdata.value["password"];
      this.rec.username = formdata.value["username"];
      this.rec.phone_status = false;
      this.rec.email_status = false;
      this.rec.profile_completed_status = null;
      this.rec.joining_date = new Date();
      if (this.rec.username.split(" ").length > 1) {
        Swal.fire("Error", "Username Should Not Contain Space", "error")
      } else {
        if (this.rec.password.length >= 8) {
          Swal.fire("Email Has Been Sent to Your Email. Go There and Copy the Token And Paste Here");
          this.recService.VerifyEmail(this.rec.email).subscribe(
            data => {
              if (data["message"] == "success") {
                Swal.fire({
                  title: "Email Verification",
                  text: "Enter token Sent On Email",
                  input: 'number',
                  showCancelButton: true
                }).then((result) => {
                  if (result.value) {
                    if (result.value == data["token"]) {
                      this.rec.email_status = true;
                      this.recService.signup(this.rec).subscribe(
                        data => {
                          if (data["message"] == "success") {
                            Swal.fire("Successfully", "Successfully Registered", "success")
                          } else {
                            Swal.fire("Error", data["message"], "error")
                          }
                        },
                        err => { Swal.fire(err) }
                      );
                    } else {
                      Swal.fire("Error", "Wrong Token", "error");
                    }
                  }
                });
              } else {
                Swal.fire("Error", data["message"], "error");
              }
            },
            err => { console.log(err) }
          )
        } else {
          Swal.fire("Error", "Password Lenght Should be atleast 8 Character", "error");
        }
      }

    } else if (this.user_type == 2) {

      this.org.email = formdata.value["email"];
      this.org.password = formdata.value["password"];
      this.org.username = formdata.value["username"];
      this.org.email_status = false;
      this.org.phone_status = false;
      this.org.profile_completed_status = false;
      this.org.joining_date = new Date();
      if (this.org.username.split(" ").length > 1) {
        Swal.fire("Error", "Username Should Not Contain Space", "error")
      } else {
        if (this.org.password.length >= 8) {
          Swal.fire("Email Has Been Sent to Your Email. Go There and Copy the Token And Paste Here");
          this.orgService.VerifyEmail(this.org.email).subscribe(
            data => {
              if (data["message"] == "success") {
                Swal.fire({
                  title: "Email Verification",
                  text: "Enter token Sent On Email",
                  input: 'number',
                  showCancelButton: true
                }).then((result) => {
                  if (result.value) {
                    if (result.value == data["token"]) {
                      this.org.email_status = true;
                      this.orgService.signup(this.org).subscribe(
                        data => {
                          if (data["message"] == "success") {
                            Swal.fire("Successfully", "Successfully Registered", "success")
                          } else {
                            Swal.fire("Error", data["message"], "error")
                          }
                        },
                        err => { Swal.fire(err) }
                      );
                    } else {
                      Swal.fire("Error", "Wrong Token", "error");
                    }
                  }
                });
              } else {
                Swal.fire("Error", data["message"], "error");
              }
            },
            err => { console.log(err) }
          )
        } else {
          Swal.fire("Error", "Password Lenght Should be atleast 8 Character", "error");
        }
      }
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: 'User type not selected' });
    }
  }
}
