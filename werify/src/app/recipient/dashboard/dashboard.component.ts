import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Recipient } from 'src/app/models/recipient';
import { ActivatedRoute } from '@angular/router';
import { Certificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private imageSrc;
  private rec: Recipient;
  private certificates: Certificate[];
  constructor(private recService: RecipientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recService.recipientDetails(localStorage.getItem("Rusername")).subscribe(
      data => {
        this.rec = data[0];
        this.imageSrc = "http://localhost:3000/assets/" + this.rec.img_path
        // console.log(this.rec);
      },
      err => {
        console.log(err)
      }
    );
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
