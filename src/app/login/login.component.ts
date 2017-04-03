import { Component, OnInit } from '@angular/core';
import { AppuserService }         from '../ApiClass/appuser.service';
import { Router }            from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import * as BigNumber from 'bignumber.js';

import { Secret } from '../ApiClass/secret';
import { LibUser }                from '../ApiClass/lib-user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppuserService]
})
export class LoginComponent implements OnInit {
  private mySecret: Secret;
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
      .then((response) => {
        if((response.json().user as LibUser)!=null){
        this.localStService.set('login', login);
        this.localStService.set('password', password);
        this.SecretSettings(response, login);
        this.router.navigate(['/dashboard/' + user.login]);
        }
        else{
        alert('Login or password is incorrect, please try again!');
        }
        })
        .catch( ()=> 
        {
        alert('We have some problem on Main Server, please send message to support');
        }
        );
  }
        SecretSettings(response: any, login: string){
            BigNumber.config({ DECIMAL_PLACES: 0 })
            this.mySecret = new Secret();
            let G = new BigNumber(response.json().G);
            let P = new BigNumber(response.json().P);
            let ServerPublicKey = new BigNumber(response.json().ServerPublicKey);
            let PrivateKey = Math.floor(Math.random() * (10000 - 100)) + 100;
            this.mySecret.ServerPublicKey = (G.pow(PrivateKey).mod(P)).toString(10);
            this.localStService.set('SuperSecret', (ServerPublicKey.pow(PrivateKey)).mod(P).toString(10));
            console.log("Super Secret Key: " + (ServerPublicKey.pow(PrivateKey)).mod(P).toString(10));
        this.libuserService.SendClientPublicKey(login, this.mySecret.ServerPublicKey)
      .then((secret) => {
        if(secret!=null){
        }
        else{
        throw new EvalError('We have trouble with secret key!');
        }
        })
        .catch( ()=> 
        {
        alert('We have some problem on Main Server, please send message to support');
        }
        );
        }
    }
