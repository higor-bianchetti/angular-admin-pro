import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UserService } from "../../services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.formBuilder.group(
    {
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      password2: ["", Validators.required],
      terms: [false, Validators.requiredTrue],
    },
    {
      validators: this.equalsPasswords("password", "password2"),
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  newUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl("/");
      },
      (err) => {
        Swal.fire("Error!", err.error.msg, "error");
      }
    );
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  checkPasswords() {
    const password1 = this.registerForm.get("password").value;
    const password2 = this.registerForm.get("password2").value;

    if (password1 !== password2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  checkTerms() {
    return !this.registerForm.get("terms").value && this.formSubmitted;
  }

  equalsPasswords(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(password1);
      const pass2 = formGroup.get(password2);

      if (pass1.value === pass2.value) {
        pass2.setErrors(null);
      } else {
        pass2.setErrors({ notEqual: true });
      }
    };
  }
}
