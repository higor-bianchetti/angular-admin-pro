import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RegisterForm } from "../interfaces/register-form.interface";
import { LoginForm } from "../interfaces/login-form.interface";
import { environment } from "../../environments/environment";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData);
  }
}
