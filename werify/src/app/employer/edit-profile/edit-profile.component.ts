import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  org: Organization;
  imageSrc;
  file: File;
  newDate: string;
  emailStatus: boolean;
  constructor(private orgService: OrganizationService, private router: Router) { }

  ngOnInit() {
    this.org = null;
    this.orgService.orgDetails().subscribe(
      data => {
        this.org = data[0];
        if (this.org.creation_date) {
          // var d = new Date(this.org.dob);
          // var month: string;
          // var day: string;
          // var year: string;
          // console.log(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay())
          // if (d.getMonth() < 10) {
          //   month = "0" + d.getMonth();
          // } else {
          //   month = "" + d.getMonth();
          // }
          // if (d.getDay() < 10) {
          //   day = "0" + d.getDay();
          // } else {
          //   day = "" + d.getDay();
          // }
          // if (("" + d.getFullYear()).length == 3) {
          //   year = d.getFullYear() + "0";
          // } else {
          //   year = d.getFullYear() + "";
          // }
          // // console.log(year + "-" + month + "-" + day)
          // this.newDate = year + "-" + month + "-" + day;
        }
        if (this.org.img_path) {
          this.imageSrc = "http://localhost:3000/assets/" + this.org.img_path;
        }
      },
      err => {
        console.log(err)
      }
    );
  }

  onSubmit() {
    if (!this.imageSrc) {
      Swal.fire('No File Selected', 'Please Select a File Also', 'error');
    } else {
      this.org.creation_date = new Date(this.newDate);
      console.log(this.org.creation_date);
      var data = new FormData();
      if (this.file) {
        data.append('file', this.file, this.file.name);
      }
      data.append('org', JSON.stringify(this.org));
      console.log(this.org);
      this.orgService.updateOrganization(data).subscribe(
        data => {
          if (data['message'] == "success") {
            Swal.fire('Updated', 'Profile Uploaded Successfully', 'success');
            this.router.navigate(['/employer/'.concat(localStorage.getItem("Ousername"))]);
          }
        },
        err => console.log(err)
      );
    }
  }

  onFileSelected($event) {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(this.file);
  }


}
