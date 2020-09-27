import { Component, OnInit } from "@angular/core";

import { SearchesService } from "../../../services/searches.service";
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
  public tempUsers: User[] = [];
  public offset: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchesService: SearchesService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getUsers(this.offset).subscribe((obj) => {
      this.totalUsers = obj.total;
      this.users = obj.users;
      this.tempUsers = obj.users;
      this.loading = false;
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

  search(target: string) {
    if (target.length === 0) {
      return (this.users = this.tempUsers);
    }

    this.searchesService.search("users", target).subscribe((result) => {
      this.users = result;
    });
  }
}
