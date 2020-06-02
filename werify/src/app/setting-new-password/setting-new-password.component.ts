import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setting-new-password',
  templateUrl: './setting-new-password.component.html',
  styleUrls: ['./setting-new-password.component.css']
})
export class SettingNewPasswordComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService) { }

  private username: string;
  private user_type: string;
  private forgot_password_key: string;

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.user_type = this.route.snapshot.paramMap.get('user_type');
    this.forgot_password_key = this.route.snapshot.paramMap.get('time_value');
    console.log(this.username);
    console.log(this.user_type);
    console.log(this.forgot_password_key);
  }

  onSubmit(formdata: NgForm) {
    this.adminService.SetNewPassword(this.username, this.user_type, this.forgot_password_key, formdata.value["new_password"]).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Password Changed Successfully", "success");
        } else {
          Swal.fire("Error", data["message"], "error");
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
