import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector("#theme");
  public selectors: NodeListOf<Element>;

  constructor() {}

  ngOnInit() {
    this.selectors = document.querySelectorAll(".selector");
    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute("href", url);
    localStorage.setItem("theme", theme);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.selectors.forEach((element) => {
      element.classList.remove("working");

      const themeSelected = element.getAttribute("data-theme");
      const urlThemeSelected = `./assets/css/colors/${themeSelected}.css`;
      const currentTheme = this.linkTheme.getAttribute("href");

      if (urlThemeSelected === currentTheme) {
        element.classList.add("working");
      }
    });
  }
}
