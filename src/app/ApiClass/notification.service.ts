import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class NotificationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'https://localhost:3357';  // URL to web api
  constructor(private http: Http) { }
  getNotifications(username: string): Promise<LibNotification[]>{
    const url = `${this.usersUrl}/{username}/notifications`;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("user JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().users as LibUser[]);
               })
               .catch(this.handleError);
}
}
