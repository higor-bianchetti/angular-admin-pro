import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PagesRoutingModule } from "./pages/pages.routing";

import { RegisterComponent } from "./auth/register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
