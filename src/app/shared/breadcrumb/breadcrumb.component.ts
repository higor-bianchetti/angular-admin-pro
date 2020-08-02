import { Component } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styles: [],
})
export class BreadcrumbComponent {
  public title: string;

  constructor(private router: Router) {
    this.getDataRouting();
  }

  getDataRouting() {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe((data) => {
        this.title = data.title;
        document.title = `Admin Pro - ${data.title}`;
      });
  }
}
