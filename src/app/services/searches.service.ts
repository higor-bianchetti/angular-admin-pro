import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { User } from "../models/user.model";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class SearchesService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token,
      },
    };
  }

  private instantiateUsers(result: any[]): User[] {
    return result.map(
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
  }

  search(type: "users" | "doctors" | "hospitals", target: string) {
    const url = `${base_url}/all/collection/${type}/${target}`;

    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case "users":
            return this.instantiateUsers(resp.results);

          default:
            return [];
        }
      })
    );
  }
}
