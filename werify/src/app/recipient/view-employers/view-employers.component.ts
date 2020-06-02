import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-view-employers',
  templateUrl: './view-employers.component.html',
  styleUrls: ['./view-employers.component.css']
})
export class ViewEmployersComponent implements OnInit {

  private orgs: Organization[];
  private imgSrc: string[];
  constructor(private recService: RecipientService) { }

  ngOnInit() {
    this.recService.viewEmployers().subscribe(
      (data: Organization[]) => {
        this.orgs = data["docs"];
        console.log(this.orgs);
      },
      err => { console.log(err) }
    );
    for (var i = 0; i < this.orgs.length; i++) {
      this.imgSrc.push("http://localhost:3000/assets/" + this.orgs[i].img_path);
    }
  }

}
