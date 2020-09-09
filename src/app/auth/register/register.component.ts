import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

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
      terms: [false, Validators.required],
    },
    {
      validators: this.equalsPasswords("password", "password2"),
    }
  );

  constructor(private formBuilder: FormBuilder) {}

  newUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log("FORM VALID");
    } else {
      console.log("FORM INVALID");
    }
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
