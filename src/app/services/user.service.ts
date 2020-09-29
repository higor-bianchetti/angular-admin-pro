import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { RegisterForm } from "../interfaces/register-form.interface";
import { LoginForm } from "../interfaces/login-form.interface";
import { environment } from "../../environments/environment";
import { GetUsers } from "../interfaces/get-users.interface";
import { User } from "../models/user.model";

declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get uid(): string {
    return this.user.uid || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token,
      },
    };
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load("auth2", () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: "GOOGLE_ID",
          cookiepolicy: "single_host_origin",
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      });
    });
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          "x-token": this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, name, role, img = "", uid } = resp.user;
          this.user = new User(name, email, "", img, google, role, uid);

          localStorage.setItem("token", resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token);
      })
    );
  }

  updateUser(data: { email: string; name: string; role: string }) {
    data = { ...data, role: this.user.role };

    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        "x-token": this.token,
      },
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem("token", resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem("token");

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("/login");
      });
    });
  }

  getUsers(offset: number = 0) {
    const url = `${base_url}/users?offset=${offset}`;

    return this.http.get<GetUsers>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              "",
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );

        return { total: resp.amount, users };
      })
    );
  }

  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;

    return this.http.delete(url, this.headers);
  }
}
