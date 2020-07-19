import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { Graph1Component } from "./pages/graph1/graph1.component";
import { LoginComponent } from "./auth/login/login.component";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "graph1", component: Graph1Component },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    ],
  },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
