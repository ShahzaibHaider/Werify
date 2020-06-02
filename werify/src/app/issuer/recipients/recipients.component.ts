import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Certificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {

  private certificates: Certificate[];
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.orgService.awardedCertificates().subscribe(
      (data: Certificate[]) => {
        this.certificates = data;
        console.log(this.certificates);
      },
      err => console.log(err)
    )
  }

}
