import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Account #');
  }

}
