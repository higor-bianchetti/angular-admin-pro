import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  menu: any[] = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Home", url: "/" },
        { title: "Progress", url: "progress" },
        { title: "Graphs", url: "graph1" },
        { title: "Promises", url: "promises" },
        { title: "Rxjs", url: "rxjs" },
      ],
    },
    {
      title: "Management",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        { title: "Users", url: "users" },
        { title: "Hospitals", url: "hospitals" },
        { title: "Doctors", url: "doctors" },
      ],
    },
  ];

  constructor() {}
}
