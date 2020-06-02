import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Course } from 'src/app/models/course';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  private courses: Course[];
  private course = new Course(null, null, null);
  constructor(private orgService: OrganizationService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.orgService.orgDetails().subscribe(
      data => {
        this.courses = data[0]["courses"];
        var course_name = this.route.snapshot.paramMap.get('course_id');
        for (var i = 0; i < this.courses.length; i++) {
          if (course_name == this.courses[i].name) {
            this.course = this.courses[i];
            break;
          }
        }
      },
      err => { console.log(err) }
    )
  }
  onSubmit(formdata: NgForm) {
    var course_name = this.route.snapshot.paramMap.get('course_id');
    for (var i = 0; i < this.courses.length; i++) {
      if (course_name == this.courses[i].name) {
        this.courses[i] = this.course;
        break;
      }
    }
    this.orgService.updateCourses(this.courses).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Course Detail Updated Successfully", "success");
        } else {
          Swal.fire("Server Interuppted", "Server Error Occured", "error");
        }
      },
      err => { console.log(err) }
    )
  }

}
