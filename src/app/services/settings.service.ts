import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private linkTheme = document.querySelector("#theme");

  constructor() {
    const theme = localStorage.getItem("theme") || "default-dark";

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute("href", url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute("href", url);
    localStorage.setItem("theme", theme);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const selectors = document.querySelectorAll(".selector");

    selectors.forEach((element) => {
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
