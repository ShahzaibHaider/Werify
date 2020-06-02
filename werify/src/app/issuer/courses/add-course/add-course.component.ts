import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { OrganizationService } from 'src/app/services/organization.service';
import { NgForm } from '@angular/forms';
import { Organization } from 'src/app/models/organization';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  private course = new Course(null, null, null);
  private org: Organization;
  constructor(private orgService: OrganizationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSubmit(formdata: NgForm) {
    if (this.course.desc.length >= 51) {
      this.orgService.orgDetails().subscribe(
        data => {
          this.org = data[0];
          var sendingdata = new FormData();
          this.org.courses.push(this.course);
          sendingdata.append("course", JSON.stringify(this.course));
          sendingdata.append("org", JSON.stringify(this.org));
          this.orgService.AddCourse(sendingdata).subscribe(
            data => {
              console.log(data);
              if (data["message"] == "Course Name Already Exists") {
                Swal.fire("Error", "Course Name Already Exist", "error");
              } else if (data["message"] == "success") {
                Swal.fire("Successful", "Course Added Successfully", "success");
                this.router.navigate(['/issuer/'.concat(localStorage.getItem("Rusername")).concat("/courses")]);
              }
            },
            err => { console.log(err) }
          )

        },
        err => { console.log(err) }
      )
    } else {
      Swal.fire("Data is Not Porper", "Description Should be between 51-65 Character long", "error")
    }

  }

}
