import { Component } from "@angular/core";

@Component({
  selector: "app-graph1",
  templateUrl: "./graph1.component.html",
  styles: [],
})
export class Graph1Component {
  labels2: string[] = ["People", "Food", "Drinks"];

  data2 = [[150, 300, 400]];
  data3 = [[150, 200, 500]];
  data4 = [[300, 25, 200]];

  colors2 = [{ backgroundColor: ["#F7FF58", "#FF934F", "#5E565A"] }];
  colors3 = [{ backgroundColor: ["#32021F", "#4B2E39", "#77A0A9"] }];
  colors4 = [{ backgroundColor: ["#395756", "#7261A3", "#A67DB8"] }];
}
