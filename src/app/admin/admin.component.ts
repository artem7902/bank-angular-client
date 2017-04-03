
import { Component, OnInit } from '@angular/core';
import { AppuserService }         from '../ApiClass/appuser.service';
import { Router }            from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { LibUser }                from '../ApiClass/lib-user';
@Component({
    selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
 providers: [AppuserService]
})
export class AdminComponent implements OnInit {
  constructor(private libuserService: AppuserService, private router: Router, private localStService: LocalStorageService) { }

  ngOnInit() {
    if(this.localStService.get<string>('login')!='' && this.localStService.get<string>('password')!='')
      this.router.navigate(['/newdashboard/' + this.localStService.get<string>('login')]);
  }
  user_check(login: string, password : string){
    let user: LibUser = new LibUser();
    // user.login=login.trim();
    user.login='admin';
    // if (!login || !password) {
    // alert('You did not fill all fields!');
    //   return;
    // }
    user.password=password;
    this.libuserService.login(user.login, user.password)
      .then((user) => {
        if(user!=null){
          this.localStService.set('login', login);
          this.localStService.set('password', password);
          if(user.role_id == 0) {
            this.router.navigate(['/newdashboard/' + user.login]);
          }
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
