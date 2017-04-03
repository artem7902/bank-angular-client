import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AccountComponent } from '../account/account.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { NotificationComponent } from '../notification/notification.component';
import { RegistrationComponent } from '../registration/registration.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [
{ path: '',  redirectTo: "/login", pathMatch: 'full'},
  { path: 'dashboard/:username',  component: DashboardComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: ':username/accounts/new',  component: CreateAccountComponent },
  { path: ':username/accounts/:accountId',     component: AccountComponent },
  { path: 'login',  component: LoginComponent },
  { path: ':username/notifications',  component: NotificationComponent },
{path: 'admin' , component:AdminComponent},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModuleModule { }
