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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers(0).subscribe(({ amount, users }) => {
      this.totalUsers = amount;
      this.users = users;
    });
  }
}
