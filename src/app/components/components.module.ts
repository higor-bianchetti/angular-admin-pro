import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IncrementorComponent } from "./incrementor/incrementor.component";

@NgModule({
  declarations: [IncrementorComponent],
  exports: [IncrementorComponent],
  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
