import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = userService.user;
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;

      this.user.name = name;
      this.user.email = email;
    });
  }
}
