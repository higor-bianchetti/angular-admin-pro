import { Component } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"],
})
export class ProgressComponent {
  progress1: number = 25;
  progress2: number = 75;

  get getProgress1() {
    return `${this.progress1}%`;
  }

  get getProgress2() {
    return `${this.progress2}%`;
  }

  getProgressChanged(bar: number, value: number) {
    if (bar == 1) {
      this.progress1 = value;
    } else {
      this.progress2 = value;
    }
  }
}
