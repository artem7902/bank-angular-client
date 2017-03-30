import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router }            from '@angular/router';

import { LibUser }                from '../ApiClass/lib-user';
import { AppuserService }         from '../ApiClass/appuser.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AppuserService]
})
export class RegistrationComponent implements OnInit {

  constructor(private titleService: Title, private libuserService: AppuserService, private router: Router, private localStService: LocalStorageService) { }

  ngOnInit() {
  if(this.localStService.get<string>('login')!='' && this.localStService.get<string>('password')!='')
  this.router.navigate(['/dashboard/' + this.localStService.get<string>('login')]);
  this.titleService.setTitle('New User Registration');
  }
 add(personal_id: number, login: string, password: string, first_name: string, last_name: string, email: string, adress: string, phone: string): void {
    login =  login.trim();
    first_name = first_name.trim();
    last_name = last_name.trim();
    email = email.trim();
    adress = adress.trim();
    phone = phone.trim();
    if (!personal_id || !first_name || !last_name || !email || !adress || !phone) {
    alert('You did not fill all fields!');
      return;
    }
    let user:LibUser = new LibUser();
    user.user_id = personal_id;
    user.login = login;
    user.firstName = first_name;
    user.lastName = last_name;
    user.email = email;
    user.adress = adress;
    user.phone = phone;
    user.wallet = 1000;
    user.role_id = 1;
    user.password=password;
    this.libuserService.create(user)
      .then(user => {
      if(user!=null){
        alert('You have successfully signed up! Please sign in!');
        this.router.navigate(['/login']);
        }
      else alert("Information about yourself is incorrect, please check all fields!");
      },
      function()
        {alert('We have some problem on Main Server, please send message to support');}
        );
  }
}
