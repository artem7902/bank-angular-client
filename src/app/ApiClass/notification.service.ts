import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LibNotification } from './lib-notification';

@Injectable()
export class NotificationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'https://localhost:3357';  // URL to web api
  constructor(private http: Http) { }
  getNotificationsForUser(username: string): Promise<LibNotification[]>{
    const url = `${this.usersUrl}/{username}/notifications`;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("notifications JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().notifications as LibNotification[]);
               })
               .catch(this.handleError);
}
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
