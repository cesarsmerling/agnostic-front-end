import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Context, Signal } from "../merlin-signals";

@Component({
  selector: "app-child-test",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>In child: {{ userSignal.value | json }}</div>
    <button (click)="childChange()">Change from Child</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildTestComponent implements OnInit, OnDestroy {
  @Input() cx!: Context;
  @Input() userSignal!: Signal<{
    name: string;
    lastname: string;
  }>;

  constructor() {}

  ngOnInit(): void {
    this.cx.createEffect(
      () => {
        console.log("Effect firing on CHILD", this.userSignal.value);
      },
      { element: "child" }
    );
  }

  ngOnDestroy() {
    this.cx.clean("child");
  }

  childChange() {
    this.userSignal.update((value) => {
      value.lastname = "Child";
      return value;
    });
  }
}
