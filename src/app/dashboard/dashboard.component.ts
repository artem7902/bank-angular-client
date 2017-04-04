import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

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
private isUser: boolean;

  constructor(private titleService: Title,  private libaccountService: AccountService, private thisRoute: ActivatedRoute, private router: Router, private localStService: LocalStorageService){}

  ngOnInit() {
   this.titleService.setTitle('Dashboard');
   this.username=this.thisRoute.snapshot.params['username'];
   this.isUser = this.localStService.get<string>('login').indexOf('admin') > -1 ? false : true;
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
GotoAccount(AccountId: number){
       this.router.navigate(['/' + this.thisRoute.snapshot.params['username'] + '/accounts/' + AccountId]);       
}
}
