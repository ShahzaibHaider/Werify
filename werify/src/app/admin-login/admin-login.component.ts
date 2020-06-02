import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  private admin = new Admin(null, null);
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(formdata: NgForm) {
    this.admin.username = formdata.value["username"];
    this.admin.password = formdata.value["password"];
    this.adminService.signin(this.admin).subscribe(
      data => {
        if (data["message"] == "success") {
          localStorage.setItem("Atoken", data["token"]);
          localStorage.setItem("Ausername", this.admin.username);
          this.router.navigate(['admin/'.concat(this.admin.username)]);
        } else {
          Swal.fire("Error", data["message"], "error");
        }
      },
      err => { console.log(err) }
    )
  }

}
