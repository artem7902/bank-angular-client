import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { AccountService }         from '../ApiClass/account.service';
import { LibBank } from '../ApiClass/lib-bank';
import { LibAccount } from '../ApiClass/lib-account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../dashboard/dashboard.component.css'],
  providers: [AccountService]
})
export class CreateAccountComponent implements OnInit {
  private banks;
  private currentBank="";
  showStyle: false;
  constructor(private titleService: Title, private libaccountService: AccountService, private thisRoute: ActivatedRoute) { }

  ngOnInit() {
      this.titleService.setTitle('Create new account');
      this.banks = new Array<LibBank>();
      this.GetBanks("", '0', '100');
  }
    GetBanks(bankName: string, depPers: string, credPers: string){
    let bank = new LibBank();
    bankName=bankName.trim();
    bank.name=bankName;
    bank.creditPersent=credPers;
    bank.depositPersent=depPers;
    this.libaccountService.getBanks(bank)
      .then(banks => {
        this.banks=banks;
      }).catch(
      () =>
        {
        console.log("Banks get error or Rest is turn off!");
        }
        );
    }
    CreateAccount(){
    if(this.currentBank==""){
    alert("Please select bank");
    return;      
    }
    this.libaccountService.AddAccount(this.thisRoute.snapshot.params['username'], this.currentBank)
      .then(account => {
        if(account!=null)alert('Add new account with id ' + account.accountId)
      }).catch(
      () =>
        {
        console.log("Banks get error or Rest is turn off!");
        }
        );  
    }
    getStyle(bank: string) {
    if(this.currentBank==bank) {
      return "green";
    } else {
      return "";
    }
  }
}
