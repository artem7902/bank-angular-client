import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LibAccount } from '../ApiClass/lib-account';
import { AccountService } from '../ApiClass/account.service';
import { LibTransaction } from '../ApiClass/lib-transaction';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {
    private accountId: string;
    private account: LibAccount;
    
  constructor(private titleService: Title, private service: AccountService, private thisRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Account #');
    this.accountId = this.thisRoute.snapshot.params['accountId'];
    this.account=new LibAccount();
    this.account.transaction=new Array<LibTransaction>();
    this.getAccount();
  }

  getAccount() {
      this.service.getAccountTransactions(this.accountId)
              .then(response => {
                  //this.account = account;
                  this.account = response.json().account as LibAccount;
              console.log(this.account.value);
              this.account.transaction = response.json().transaction as Array<LibTransaction>;
              })
              .catch(() => {
                      console.log("Transactions get error or Rest is turn off!");
              });
  }
}
