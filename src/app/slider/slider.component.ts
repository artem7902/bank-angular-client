import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router }            from '@angular/router';

import { AppuserService }         from '../ApiClass/appuser.service';
import { LibUser }                from '../ApiClass/lib-user';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [AppuserService]
})
export class SliderComponent implements OnInit {
  private today : Date;
  private user: LibUser;
  public InfoInt;
  public TimeInt;
  constructor( private libuserService: AppuserService, private localStService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.today=new Date();
    this.user = new LibUser();
    this.UpdateInfo();
    this.TimeInt=setInterval(() => {
     this.today=new Date((this.today.valueOf() + 1000));
     }, 1000);
    this.InfoInt=setInterval(() => {
      this.UpdateInfo();
     }, 10000);
  }
  UpdateInfo(){
       this.libuserService.getSliderInfo(this.localStService.get<string>('login'))
      .then(user => {
      if(user==null)alert("Login is incorrect!");
      else{
        this.user=user;
        }
      }).catch(
      () =>
        {
        console.log("Autorization false or Rest is turn off!");
        this.libuserService.login(this.localStService.get<string>('login'), this.localStService.get<string>('password'))
        .then(() => {
        })
        .catch( ()=> 
        {
        this.Logout()
        }
        );
        }
        );
    }
  Logout(){
    this.localStService.set('login', ''); 
    this.localStService.set('password', '');
    this.localStService.set('token', '');
    this.router.navigate(['/login']);
    }
    StopInterval(){
     clearInterval(this.InfoInt);
     clearInterval(this.TimeInt);    
     }
}
