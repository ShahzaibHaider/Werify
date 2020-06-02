import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Certificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-cert-wallet',
  templateUrl: './cert-wallet.component.html',
  styleUrls: ['./cert-wallet.component.css']
})
export class CertWalletComponent implements OnInit {

  private certificates: Certificate[];
  constructor(private recService: RecipientService) { }

  ngOnInit() {
    this.recService.getRecipientCertificates().subscribe(
      (data: Certificate[]) => {
        this.certificates = data["docs"];
      },
      err => {
        console.log(err);
      }
    )
  }

}
