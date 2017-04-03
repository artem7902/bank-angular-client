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
    private error_message: string;
    
  constructor(private titleService: Title, private service: AccountService, private thisRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Account #');
    this.accountId = this.thisRoute.snapshot.params['accountId'];
    this.account=new LibAccount();
    this.account.transaction=new Array<LibTransaction>();
    this.error_message = "";
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
  
  transfer(account_id: string, value: string) {
      if(!account_id || !value) {
          alert("fill all fields!");
          return;
      }
      this.service.transfer(account_id, value, this.accountId)
              .then(response => {
                  this.account = response.json().account as LibAccount;
                  console.log(this.account.value);
                  this.account.transaction = response.json().transaction as Array<LibTransaction>;
                  this.error_message = response.json().error_message as string;
              })
              .catch(() => {
                  console.log("Transactions get error or Rest is turn off!");
              });
  }
  
  transaction(value: string, operation: string) {
      if(!value) {
          alert("fill all fields!");
          return;
      }
      value = operation.indexOf("bring_in") > -1 ? value : '-' + value;
      this.service.transaction(value, this.accountId)
      .then(response => {
          this.account = response.json().account as LibAccount;
          console.log(this.account.value);
          this.account.transaction = response.json().transaction as Array<LibTransaction>;
          this.error_message = response.json().error_message as string;
      })
      .catch(() => {
          console.log("Transactions get error or Rest is turn off!");
      });
  }
}
