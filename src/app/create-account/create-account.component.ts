import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
      this.titleService.setTitle('Create new account');
  }

}
