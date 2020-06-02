import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public org: Organization;
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.orgService.orgDetails().subscribe(
      data => {
        this.org = data[0];
      },
      err => { console.log(err) }
    );
  }
  deletecourse(course_name: string) {

    this.orgService.deleteCourse(course_name).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Deleted Succesfully", "success");
        }
        this.orgService.orgDetails().subscribe(
          data => { this.org = data[0] },
          err => { console.log(err) }
        )
      },
      err => { console.log(err) }
    )
  }

}
