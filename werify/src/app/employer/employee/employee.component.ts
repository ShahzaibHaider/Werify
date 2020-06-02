import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private employees: Employee[] = [];
  constructor(private orgService: OrganizationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orgService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data["docs"];
      },
      err => { console.log(err) }
    )
  }
  goto(username: string) {
    this.router.navigate(["employer/".concat(localStorage.getItem("Ousername").concat("/find_recipients/".concat(username)))]);
  }

}
