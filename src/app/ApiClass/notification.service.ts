import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LibNotification } from './lib-notification';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class NotificationService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:3357';  // URL to web api
  constructor(private http: Http, private localStService: LocalStorageService) { }
  getNotificationsForUser(username: string): Promise<LibNotification[]>{
    const url = `${this.usersUrl}/${username}/notifications`;
    this.headers.set('X-Authorization', this.localStService.get<string>('token'));
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(url, options)
               .toPromise()
               .then(response =>{
                 console.log("notifications JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().notifications as Array<LibNotification>);
               })
               .catch(this.handleError);
}
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
