import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { IncrementorComponent } from "./incrementor/incrementor.component";
import { DoughnutComponent } from "./doughnut/doughnut.component";

@NgModule({
  declarations: [IncrementorComponent, DoughnutComponent],
  exports: [IncrementorComponent, DoughnutComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
