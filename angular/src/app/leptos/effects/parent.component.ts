import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Context, Signal } from "../merlin-signals";
import { ChildTestComponent } from "./child-test.component";

@Component({
  selector: "app-parent-test",
  template: `
    <h5>Parent Component</h5>

    <app-child-test
      *ngIf="!hide"
      [cx]="cx"
      [userSignal]="userSignal"
    ></app-child-test>

    <button (click)="changeFromParent()">Change from Parent</button>
    <button (click)="hide = !hide">Hide</button>
    <div>In parent: {{ userSignal.value | json }}</div>
  `,
  standalone: true,
  imports: [CommonModule, ChildTestComponent],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ParentComponent implements OnInit {
  cx = Context.create();

  userSignal!: Signal<{
    name: string;
    lastname: string;
  }>;

  hide = false;

  constructor() {}

  ngOnInit() {
    this.userSignal = this.cx.createSignal({
      name: "Merlin",
      lastname: "Mage",
    });

    this.cx.createEffect(() => {
      console.log("Effect firing on PARENT", this.userSignal.value);
    });
  }
  changeFromParent() {
    this.userSignal.update((value) => {
      value.name = "Parent";
      return value;
    });
  }
}
