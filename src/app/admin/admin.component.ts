import { Component, OnInit } from '@angular/core';
import { AppuserService }    from '../ApiClass/appuser.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private appservice: AppuserService ) { }



  ngOnInit() {
  }
}
