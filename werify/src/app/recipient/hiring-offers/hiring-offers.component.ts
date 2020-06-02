import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HireRequest } from 'src/app/models/hire-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hiring-offers',
  templateUrl: './hiring-offers.component.html',
  styleUrls: ['./hiring-offers.component.css']
})
export class HiringOffersComponent implements OnInit {

  private hireRequests: HireRequest[] = [];
  constructor(private recService: RecipientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recService.getHireRequests().subscribe(
      (data: HireRequest[]) => {
        this.hireRequests = data["docs"];
      },
      err => { console.log(err) }
    )
  }
  AcceptOffer(hireRequestID: string, from: string) {
    this.recService.AcceptOffer(hireRequestID, from).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Success", "You are now Employed", "success");
          this.recService.getHireRequests().subscribe(
            (data: HireRequest[]) => {
              this.hireRequests = data["docs"];
            },
            err => { console.log(err) }
          )
        } else {
          Swal.fire("Unsuccessful", "Server Problem", "error");
        }
      },
      err => { console.log(err) }
    )
  }
  RejectOffer(hireRequestID: string) {
    this.recService.RejectOffer(hireRequestID).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Success", "You are now Employed", "success");
          this.recService.getHireRequests().subscribe(
            (data: HireRequest[]) => {
              this.hireRequests = data["docs"];
            },
            err => { console.log(err) }
          )
        } else {
          Swal.fire("Unsuccessful", "Server Problem", "error");
        }
      },
      err => { console.log(err) }
    )
  }


}
