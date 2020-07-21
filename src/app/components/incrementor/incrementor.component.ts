import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-incrementor",
  templateUrl: "./incrementor.component.html",
  styles: [],
})
export class IncrementorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input("value") progress: number = 30;
  @Input() btnClass: string = "btn-primary";

  @Output() changeProgress: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.changeProgress.emit(100);
      return (this.progress = 100);
    }

    if (this.progress <= 0 && value < 0) {
      this.changeProgress.emit(0);
      return (this.progress = 0);
    }

    this.progress = this.progress + value;
    this.changeProgress.emit(this.progress);
  }
}
