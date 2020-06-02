import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization.service';
import Swal from 'sweetalert2';
import { RecipientService } from 'src/app/services/recipient.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private recService: RecipientService) { }

  ngOnInit() {
  }

  onSubmit(formdata: NgForm) {
    this.recService.changePassword(formdata.value["old_password"], formdata.value["new_password"]).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Password Changed Successfully", "success");
        } else {
          Swal.fire("Error", data["message"], "error");
        }
      },
      err => { console.log(err) }
    )
  }
}
