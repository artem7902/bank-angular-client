import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { LibUser } from './lib-user';
import * as CryptoJS from "crypto-js";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppuserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:3357';  // URL to web api
  private token: string;
  public loggedUser:LibUser;
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }
login(login:string, password: string){
   this.token = "";
    const url = `${this.usersUrl}/auth`;
    let data={"login":login, "password":password};
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response => {
         this.loggedUser = response.json().user;
         this.token = response.json().token;
         this.localStService.set('login', login);
         this.localStService.set('password', password);
         this.localStService.set('token', this.token);
      })
      .catch(this.handleError);
  }
  getUsers(): Promise<LibUser[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("user JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().users as LibUser[]);
               })
               .catch(this.handleError);
  }

//example of debug of promise
  getUser(id: number): Promise<LibUser> {
    const url = `${this.usersUrl}/byid/${id}`;
    return this.http.get(url,{headers: this.headers}).toPromise()
         .then(response => {
          let user: LibUser;
          console.log("user JSON: "+JSON.stringify(response.json()));
          user = response.json().users[0];
          console.log("User: "+user.login)
          return Promise.resolve(user);
        })
       .catch(
        this.handleError
       );
  }

  create(user: LibUser): Promise<LibUser> {
    const url = `${this.usersUrl}/users/add`;
    let data={"user": null};
    data.user = user;
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("user create JSON: "+JSON.stringify(response.json()));
        return Promise.resolve(response.json().users[0] as LibUser);
      })
      .catch(this.handleError);
  }

  update(user:  LibUser): Promise<any> {
    const url = `${this.usersUrl}/update`;
    let data={"user":null};
    data.user = user;
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response => response.json().users[0] as LibUser)
      .catch(this.handleError);
  }

  delete(id: number): Promise<number> {
      const url = `${this.usersUrl}/del/${id}`;
       return this.http.get(url)
      .toPromise()
      .then(response => response.json().retcode as number)
      .catch(this.handleError);
  }
  check(user: LibUser): Promise<LibUser>{
    const url = `${this.usersUrl}/check_user`;
    user.password=CryptoJS.SHA512(user.password, '3357bank');
    user.password=user.password.toString();
    let data={"user": null};
    data.user = user;
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("user check JSON: "+JSON.stringify(response.json()));
        return Promise.resolve(response.json().users[0] as LibUser);
      })
      .catch(this.handleError);
    }
        getSliderInfo(username: string) :  Promise<LibUser>{
            const url = `${this.usersUrl}/users/${username}/sliderInfo`;
            this.headers.set('X-Authorization', this.localStService.get<string>('token'));
            let options = new RequestOptions({ headers: this.headers });
            return this.http.get(url, options)
            .toPromise()
            .then(response =>{
        console.log("Info for slider JSON: "+JSON.stringify(response.json()));
        return Promise.resolve(response.json() as LibUser);
            })
            .catch(this.handleError);
        }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
      
}
