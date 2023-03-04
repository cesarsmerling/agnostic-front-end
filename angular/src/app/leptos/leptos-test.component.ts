import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";
import { Context, Signal } from "./merlin-signals";

@Component({
  selector: "leptos-test",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4>Leptos Test</h4>
    <div>Count Signal: {{ countSignal.value }}</div>
    <div>More Signal: {{ moreSignal.value }}</div>
    <div>Derived Signal: {{ derivedSignal.value }}</div>
    <br />
    <button (click)="increment()">+1</button>
    <button (click)="decrement()">-1</button>
    <button (click)="moreSignal.value = moreSignal.value + 2">+2 Signal</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeptosTestComponent implements OnInit {
  countSignal!: Signal<number>;
  moreSignal!: Signal<number>;
  derivedSignal!: Signal<number>;

  ngOnInit(): void {
    const cx = Context.create();

    //We have two signals with different values
    this.countSignal = cx.createSignal(0);
    this.moreSignal = cx.createSignal(10);

    //We can derive a new signal from the two signals
    this.derivedSignal = cx.combine(
      () => this.countSignal.value + this.moreSignal.value
    );

    //We can create effects that fire when the signal changes
    cx.createEffect(() => {
      console.log("Effect firing on countSignal", this.countSignal.value);
    });

    cx.createEffect(() => {
      console.log("Effect firing on moreSignal", this.moreSignal.value);
    });

    //We can create an effect when the derived signal changes
    cx.createEffect(() => {
      console.log("Effect firing on derivedSignal", this.derivedSignal.value);
    });

    //We can create an effect that fires when the countSignal changes
    //but also has access to the moreSignal value but spy don't fire the effect on changes
    cx.createEffect(() => {
      console.log(
        "Effect firing on count but more is spied",
        this.countSignal.value,
        this.moreSignal.spy
      );
    });

    //We can create an effect that fires when several signal changes
    cx.createEffect(() => {
      console.log(
        "Effect firing for both signals",
        this.countSignal.value,
        this.moreSignal.value
      );
    });
  }

  increment() {
    const val = this.countSignal.value;
    this.countSignal.value = val + 1;
  }

  decrement() {
    const val = this.countSignal.value;
    this.countSignal.value = val - 1;
  }
}
