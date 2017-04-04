import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import  { LibAccount } from './lib-account'
import { LibTransaction } from './lib-transaction'
import  { LibBank } from './lib-bank'
import { SecretService } from './secret.service';
@Injectable()
export class AccountService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:3357';  // URL to web api
  
  constructor(private http: Http, private localStService: LocalStorageService, private secretSer: SecretService) { }
  
  getAccountsForUser(username: string): Promise<LibAccount[]>{
    const url = `${this.usersUrl}/users/${username}/accounts`;
    this.headers.set('X-Authorization', this.localStService.get<string>('token'));
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(url, options)
               .toPromise()
               .then(response =>{
                 console.log("accounts JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(this.secretSer.toOrFromInternal(response.json().accounts) as Array<LibAccount>);
               })
               .catch(this.handleError);
}
  getAccountTransactions(accountId: string): Promise<any>{
      const url = `${this.usersUrl}/account=${accountId}`;
      this.headers.set('X-Authorization', this.localStService.get<string>('token'));
      let options = new RequestOptions({ headers: this.headers });
      return this.http.get(url, options)
              .toPromise()
              .then(response => {
                  console.log("transactions JSON: "+JSON.stringify(response.json()));
                  /*let la: LibAccount = response.json().account as LibAccount;
                  console.log(la.value);
                  la.transaction = response.json().transaction as Array<LibTransaction>;
                  console.log(la.transaction[0]);*/
                  return Promise.resolve(response);
              })
              .catch(this.handleError);
  }
   getBanks(bank: LibBank): Promise<LibBank[]>{
    const url = `${this.usersUrl}/banks`;
    this.headers.set('X-Authorization', this.localStService.get<string>('token'));
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(url, this.secretSer.toOrFromInternal(bank), options)
               .toPromise()
               .then(response =>{
                 console.log("accounts JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(this.secretSer.toOrFromInternal(response.json().banks) as Array<LibBank>);
               })
               .catch(this.handleError);
}    
    AddAccount(username: string, bank_id: string): Promise<LibAccount>{
    const url = `${this.usersUrl}/${username}/addNewAccount/${bank_id}`;
    this.headers.set('X-Authorization', this.localStService.get<string>('token'));
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(url, options)
               .toPromise()
               .then(response =>{
                 console.log("account JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(this.secretSer.toOrFromInternal(response.json().accounts[0]) as LibAccount);
               })
               .catch(this.handleError);
}     
                     
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
