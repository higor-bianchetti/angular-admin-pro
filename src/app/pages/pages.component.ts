import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styles: [],
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector("#theme");

  constructor() {}

  ngOnInit() {
    const theme = localStorage.getItem("theme") || "default-dark";

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute("href", url);
  }
}
