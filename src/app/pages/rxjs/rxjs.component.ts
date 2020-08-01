import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: [],
})
export class RxjsComponent {
  constructor() {
    this.getObservable()
      .pipe(retry(1))
      .subscribe(
        (value) => console.log("Subs: ", value),
        (error) => console.warn("Error: ", error),
        () => console.info("Observable Finished")
      );
  }

  getObservable() {
    let i = 0;

    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error("Observable is value 2");
          // i = 0;
        }
      }, 1000);
    });

    return obs$;
  }
}
