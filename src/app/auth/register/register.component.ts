import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    password2: ["", Validators.required],
    terms: [false, Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  newUser() {
    console.log(this.registerForm.value);
  }
}
