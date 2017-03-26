import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
  this.titleService.setTitle('Notifications');
  }

}
