import { Component, OnDestroy } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styles: [],
})
export class BreadcrumbComponent implements OnDestroy {
  public title: string;
  public titleSubscription: Subscription;

  constructor(private router: Router) {
    this.titleSubscription = this.getDataRouting().subscribe((data) => {
      this.title = data.title;
      document.title = `Admin Pro - ${data.title}`;
    });
  }

  getDataRouting() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }
}
