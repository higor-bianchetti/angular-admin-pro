import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [BreadcrumbComponent, SidebarComponent, HeaderComponent],
  exports: [BreadcrumbComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
