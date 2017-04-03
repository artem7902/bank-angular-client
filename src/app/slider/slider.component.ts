import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router,  NavigationStart, ActivatedRoute, Params}            from '@angular/router';

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
  constructor( private libuserService: AppuserService, private localStService: LocalStorageService, private router: Router, private activerout: ActivatedRoute) { }

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
    this.router.events.subscribe((event) =>
    {
    if(event instanceof NavigationStart){  this.StopInterval()};
    });
  }
  UpdateInfo(){
       this.libuserService.getSliderInfo(this.activerout.snapshot.params['username'])
      .then(user => {
      if(user==null)alert("Login is incorrect!");
      else{
        this.user=user;
        }
      }).catch(
      () =>
        {
        this.libuserService.login(this.localStService.get<string>('login'), this.localStService.get<string>('password'))
        .then((user) => {
            if(user==null) this.Logout();
            else this.router.navigate(['/login']);
        })
        .catch( ()=> 
        {
        console.log("Autorization false or Rest is turn off!");
        this.Logout();
        }
        );
        }
        );
    }
  Logout(){
    this.StopInterval();
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
