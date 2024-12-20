import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { ApiBaseUrl, userMail, userPassword } from "../../../config";
import axios from "axios";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  usersTemp : any = [];
  readonly ApiUrl: String = ApiBaseUrl + "/api/user";
  readonly _userMail: String = userMail;
  readonly _userPassword: String = userPassword;

  constructor(private router : Router) {
  }

  async setApiUsers(): Promise<User[]> {
    this.usersTemp = await this.getUsers()
    const newUsers = [];
    for (const user of this.usersTemp) {
      newUsers.push({
        id: user.id,
        email: user.email,
        name: user.name,
        firstname: user.firstname,
        address: user.address,
      });
    }
    this.users = newUsers;
    return this.users;
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${this.ApiUrl}/get-users`);
      return response.data;
    } catch (error) {
      console.error("erreur récupération user : ", error);
      return [];
    }
  }

  isLoggedIn(): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    return !!currentUserString;
  }

  login(mail: String, password: String): void {
    if (mail === this._userMail && password === this._userPassword) {
      const user = {
        "mail": mail,
        "password": password
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
  }

  logout() {
    if(this.isLoggedIn()) {
      localStorage.removeItem("currentUser");
      this.router.navigate(["/"])
    }
  }
}
