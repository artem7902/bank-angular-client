import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { AccountService }         from '../ApiClass/account.service';
import { LibAccount }                from '../ApiClass/lib-account';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AccountService]
})
export class DashboardComponent implements OnInit {
private accounts: LibAccount[];
private username : string = "";

  constructor(private titleService: Title,  private libaccountService: AccountService, private thisRoute: ActivatedRoute){}

  ngOnInit() {
   this.titleService.setTitle('Dashboard');
   this.username=this.thisRoute.snapshot.params['username'];
   this.accounts=new Array<LibAccount>();
   this.GetAcccountsList();
  }

GetAcccountsList(){
this.libaccountService.getAccountsForUser(this.username)
      .then(accounts => {
        this.accounts=accounts;
      }).catch(
      () =>
        {
        console.log("Accounts get error or Rest is turn off!");
        }
        );
}
}
