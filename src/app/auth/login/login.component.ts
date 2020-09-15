import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UserService } from "../../services/user.service";

declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem("email") || "",
      [Validators.required, Validators.email],
    ],
    password: ["", Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get("remember").value) {
          localStorage.setItem("email", this.loginForm.get("email").value);
        } else {
          localStorage.removeItem("email");
        }

        this.router.navigateByUrl("/");
      },
      (err) => {
        Swal.fire("Error", err.error.msg, "error");
      }
    );
  }

  renderButton() {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
    });

    this.startApp();
  }

  startApp() {
    gapi.load("auth2", () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: "GOOGLE_ID",
        cookiepolicy: "single_host_origin",
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });

      this.attachSignin(document.getElementById("my-signin2"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe((resp) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl("/");
          });
        });
      },
      function (error) {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
