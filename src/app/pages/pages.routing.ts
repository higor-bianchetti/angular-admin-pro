import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./management/users/users.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { ProfileComponent } from "./profile/profile.component";
import { Graph1Component } from "./graph1/graph1.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent, data: { title: "Dashboard" } },
      {
        path: "progress",
        component: ProgressComponent,
        data: { title: "Progress" },
      },
      { path: "graph1", component: Graph1Component, data: { title: "Graph" } },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { title: "Account Settings" },
      },
      {
        path: "promises",
        component: PromisesComponent,
        data: { title: "Promises" },
      },
      { path: "rxjs", component: RxjsComponent, data: { title: "RxJs" } },
      {
        path: "profile",
        component: ProfileComponent,
        data: { title: "User Profile" },
      },
      {
        path: "users",
        component: UsersComponent,
        data: { title: "User Management" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
