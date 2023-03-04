import { BehaviorSubject, Observable } from "rxjs";
import { ofSignal } from "./../../../../../common/src/context_test/signal-observable";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTestService } from "./data-test.service";
import { computed, signal } from "@preact/signals-core";
import { Signal } from "@preact/signals";

@Component({
  selector: "app-test2",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Component 2</h1>
    <h2>
      {{ s1.value }}
    </h2>
    <h2>
      {{ s2.value }}
    </h2>
    <h2>
      {{ s3.value }}
    </h2>
    <h2>computed from comp: {{ data3 }}</h2>
  `,
  styles: [],
})
export class Test2Component implements OnInit, AfterViewInit {
  private subject = new BehaviorSubject<string>("Start");
  s1: Signal<string> = <Signal<string>>(
    ofSignal(<any>this.subject.asObservable()).signal
  );
  s2 = signal(2);
  s3: any;
  data3: any;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => this.subject.next("Changed"), 1000);
    setTimeout(() => (this.s1.value = "changed again"), 2000);
    setTimeout(() => (this.s2.value = 3), 3000);

    this.s3 = computed(() => this.s1.value + " and other " + this.s2.value);
  }

  ngAfterViewInit(): void {}
}
