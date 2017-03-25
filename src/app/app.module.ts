import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { AccountComponent } from './account/account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NotificationComponent } from './notification/notification.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppRoutingModuleModule } from './app-routing-module/app-routing-module.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccountComponent,
    CreateAccountComponent,
    NotificationComponent,
    RegistrationComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModuleModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
