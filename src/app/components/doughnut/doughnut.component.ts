import { Component, Input } from "@angular/core";
import { MultiDataSet, Label, Color } from "ng2-charts";

@Component({
  selector: "app-doughnut",
  templateUrl: "./doughnut.component.html",
  styles: [],
})
export class DoughnutComponent {
  @Input() title: string = "Unnamed";
  @Input("chartLabels") doughnutChartLabels: Label[] = [
    "Label 1",
    "Label 2",
    "Label 3",
  ];
  @Input("chartData") doughnutChartData: MultiDataSet = [[100, 100, 100]];
  @Input("chartColors") doughnutChartColors: Color[] = [
    { backgroundColor: ["#6857E6", "#009FEE", "#F02059"] },
  ];
}
