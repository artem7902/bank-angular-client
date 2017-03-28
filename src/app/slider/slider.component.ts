import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { AppuserService }         from '../ApiClass/appuser.service';
import { LibUser }                from '../ApiClass/lib-user';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [AppuserService, LibUser]
})
export class SliderComponent implements OnInit {
  private today : Date;
  constructor( private libuserService: AppuserService, private localStService: LocalStorageService, private user: LibUser) { }

  ngOnInit() {
   this.user = new LibUser();
   this.today=new Date();
   setInterval(() => {
        this.today =  new Date();
     }, 1000);
    this.user.login=this.localStService.get('login').toString();
    this.user.password=this.localStService.get('password').toString();
    this.libuserService.get_user_info(this.user)
      .then(user => {
      if(this.user==null)alert("Login or password is incorrect, please try again!");
      else this.user=user;
      },
      function()
        {alert('We have some problem on Main Server, please send message to support');}
        );
  }

}
