import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import  { LibAccount } from './lib-account'
@Injectable()
export class AccountService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:3357';  // URL to web api
  
  constructor(private http: Http, private localStService: LocalStorageService) { }
  
  getAccountsForUser(username: string): Promise<LibAccount[]>{
    const url = `${this.usersUrl}/users/${username}/accounts`;
    this.headers.set('X-Authorization', this.localStService.get<string>('token'));
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(url, options)
               .toPromise()
               .then(response =>{
                 console.log("accounts JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().accounts as Array<LibAccount>);
               })
               .catch(this.handleError);
}
                     
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
