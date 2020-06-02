import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  onSubmit(formdata: NgForm) {
    Swal.fire("Sending...");
    this.adminService.ForgotPassword(formdata.value["email"], formdata.value["user_type"]).subscribe(
      data => {
        if (data["message"] = "success") {
          Swal.fire("Successful", "Email Sent Successfully", "success");
        } else {
          Swal.fire("Error", data["message"], "error");
        }
      },
      err => { console.log(err) }
    )
  }
}
