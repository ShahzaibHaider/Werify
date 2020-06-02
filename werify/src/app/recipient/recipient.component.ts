import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipient } from '../models/recipient';
import { RecipientService } from '../services/recipient.service';
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
  username: string;
  imageSrc;
  rec: Recipient;
  constructor(private route: ActivatedRoute, private router: Router, private recService: RecipientService) { }
  ngOnInit() {
    this.rec = null;
    this.recService.recipientDetails(localStorage.getItem("Rusername")).subscribe(
      data => {
        this.rec = data[0];
        if (this.rec.img_path) {
          this.imageSrc = "http://localhost:3000/assets/" + this.rec.img_path;
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  goto() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.router.navigate(["recipient/".concat(this.username)]);
  }
  logout() {
    localStorage.removeItem('Rusername');
    localStorage.removeItem('Rtoken');
    this.router.navigate(["/"]);
  }

}
