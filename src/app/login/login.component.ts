import { Component, OnInit } from '@angular/core';
import { AppuserService }         from '../ApiClass/appuser.service';
import { Router }            from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { LibUser }                from '../ApiClass/lib-user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppuserService]
})
export class LoginComponent implements OnInit {
  constructor(private libuserService: AppuserService, private router: Router, private localStService: LocalStorageService) { }

  ngOnInit() {
    if(this.localStService.get<string>('login')!='' && this.localStService.get<string>('password')!='')
    this.router.navigate(['/dashboard/' + this.localStService.get<string>('login')]);
  }
    user_check(login: string, password : string){
    if (!login || !password) {
    alert('You did not fill all fields!');
      return;
    }
    let user: LibUser = new LibUser();
    user.login=login.trim();
    user.password=password;
    this.libuserService.login(user.login, user.password)
      .then((user) => {
        if(user!=null){
            this.localStService.set('login', login);
            this.localStService.set('password', password);
                this.router.navigate(['/dashboard/' + user.login]);
        } else {
            alert('Login or password is incorrect, please try again!');
        }
        })
        .catch( ()=>
        {
        alert('We have some problem on Main Server, please send message to support');
        }
        );
  }
    }
