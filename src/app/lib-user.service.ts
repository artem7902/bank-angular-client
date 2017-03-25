import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/toPromise';
import { LibUser } from './ApiClass/lib-user';
@Injectable()
export class LibUserService {
private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:8080/users';  // URL to web api
  private token: string;
   constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }
    login(login:string, password: string){
    //TODO: implement later
    this.token = "12345678";
    this.localStService.add('login',login);
    this.localStService.add('password',login);
    this.localStService.add('token',this.token);
    this.headers.append('Authorization: Bearer',this.token);
  }
}
