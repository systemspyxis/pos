import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/data-model';
import {AppService} from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router,private appservice:AppService) { }
  credentials: User = {
    UserID: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
  };

  ngOnInit() {
  }
  onSubmit(form: NgForm): void{
    this.credentials.Password=form.value['Password'];
    this.credentials.UserName=form.value['UserName'];
    this.credentials.FirstName=form.value['FirstName'];
    this.credentials.LastName=form.value['LastName'];
    this.credentials.Email=form.value['Email'];
    console.log(this.credentials)
    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res => {
        this.appservice.appSettings = res;
        console.log(res);
        this.registerHandler();
      });
    } else {
      this.registerHandler();
    }
  }
  registerHandler() {
    this.auth.register(this.credentials).subscribe(() => {
      //this.router.navigateByUrl('/pos');
    }, (err) => {
      console.error(err);
    });
  }

}
