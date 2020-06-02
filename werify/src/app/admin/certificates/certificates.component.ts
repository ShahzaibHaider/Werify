import { Component, OnInit } from '@angular/core';
import { Certificate } from 'crypto';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  private certificates: Certificate[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.GetCertificates().subscribe(
      (data: Certificate[]) => {
        this.certificates = data["docs"];
      },
      err => { console.log(err) }
    )
    // this.orgService.GetJobForOrganization().subscribe(
    //   (data: Job[]) => {
    //     this.jobs = data["docs"];
    //   },
    //   err => { console.log(err) }
    // )
  }

}
