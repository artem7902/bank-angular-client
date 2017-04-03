import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';

import {AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NotificationComponent } from './notification/notification.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppRoutingModuleModule } from './app-routing-module/app-routing-module.module';
import { SliderComponent } from './slider/slider.component';
import { AdminComponent } from './admin/admin.component';
import { NewdashboardComponent } from './newdashboard/newdashboard.component';

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
    SliderComponent,
    AdminComponent,
    NewdashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModuleModule,
    RouterModule,
    LocalStorageModule.withConfig({
            prefix: 'client_bank-app',
            storageType: 'localStorage'
        })
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
