import { DataTestService } from "./data-test.service";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { computed, effect, signal } from "@preact/signals";

@Component({
  selector: "app-test1",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Component 1</h1>
    <h2>S1:{{ data.s1$.value | json }}</h2>
    <h2>S2:{{ data.s2$.value | json }}</h2>
    <h2>S3:{{ data.s3$.value | json }}</h2>
    <h2>Data3:{{ data3$ | json }}</h2>
  `,
  styles: [],
})
export class Test1Component implements OnInit {
  data3$: any;
  constructor(public data: DataTestService) {}

  ngOnInit(): void {
    setTimeout(() => (this.data.s1$.value = "Changed"), 1000);

    setTimeout(() => (this.data.s2$.value = 42), 3000);
    effect(() => (this.data3$ = this.data.s3$.value));
    setTimeout(() => effect(() => (this.data3$ = this.data.s3$.value)), 1500);
  }
}
