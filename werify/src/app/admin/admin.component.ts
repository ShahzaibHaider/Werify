import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private username: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goto() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.router.navigate(["admin/".concat(this.username)]);
  }

  logout() {
    localStorage.removeItem('Ausername');
    localStorage.removeItem('Atoken');
    this.router.navigate(["/"]);
  }

}
