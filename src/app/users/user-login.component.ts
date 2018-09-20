import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/data-model';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router,private appservice:AppService) { }
  credentials: User = {
    UserID: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
  };
  login(form: NgForm){
    this.credentials.Password=form.value['Password'];
    this.credentials.UserName=form.value['UserName'];
    console.log(this.credentials)
    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res => {
        this.appservice.appSettings = res;
        console.log(res);
        this.loginHandler();
      });
    } else {
      this.loginHandler();
    }
  }
  loginHandler() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/pos');
    }, (err) => {
      console.error(err);
    });
  }
  ngOnInit() {
  }

}
