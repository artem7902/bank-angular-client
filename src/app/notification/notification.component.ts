import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Params}            from '@angular/router';

import { NotificationService }         from '../ApiClass/notification.service';
import { LibNotification }                from '../ApiClass/lib-notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [NotificationService]
})
export class NotificationComponent implements OnInit {
  private notifications : Array<LibNotification>;
  constructor(private titleService: Title, private activerout: ActivatedRoute, private libNotifSer: NotificationService) { }

  ngOnInit() {
  this.titleService.setTitle('Notifications');
  this.GetNotifications();
  }
  GetNotifications(){
          this.libNotifSer.getNotificationsForUser(this.activerout.snapshot.params['username'])
      .then(notifications => {
        this.notifications=notifications;
      }).catch(
      () =>
        {
        console.log("Notifications get error or Rest is turn off!");
        }
        ); 
  }
          getStyle(check: boolean) {
    if(!check) {
      return "bold";
    } else {
      return "";
    }
  }

}
