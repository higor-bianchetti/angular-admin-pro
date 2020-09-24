import { Component, OnInit } from "@angular/core";

import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: [],
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public offset: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.offset).subscribe(({ amount, users }) => {
      this.totalUsers = amount;
      this.users = users;
    });
  }

  changePage(value: number) {
    this.offset += value;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset >= this.totalUsers) {
      this.offset -= value;
    }

    this.getUsers();
  }
}
