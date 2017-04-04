import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppuserService }    from '../ApiClass/appuser.service';
import { LibUser }                from '../ApiClass/lib-user';

@Component({
  selector: 'app-newdashboard',
  templateUrl: './newdashboard.component.html',
  styleUrls: ['../dashboard/dashboard.component.css'],
  providers: [AppuserService]
})
export class NewdashboardComponent implements OnInit {
  private users: LibUser[];

  constructor(private titleService: Title, private appservice: AppuserService, private router: Router) { }



  ngOnInit() {
    this.users = new Array<LibUser>();
    this.titleService.setTitle('Admin Dashboard');
    this.getUsers();
  }

  getUsers() {
    this.appservice.getUsers()
      .then(users => {
        this.users = users;
      }).catch(() => {
      console.log("Accounts get error or Rest is turn off!");
    });
  }
}
