import { UserService } from '../../service/user.service';
import { userMail, userPassword } from './../../../../config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  userMail: String = "";
  userPassword: String = "";

  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let user = localStorage.getItem("currentUser");
    let _user = user? JSON.parse(user): null;
    if(_user !== null) {
      this.userMail = _user.mail;
      this.userPassword = _user.password;
    }
  }

  logout() {
    this.userService.logout();
  }
}
