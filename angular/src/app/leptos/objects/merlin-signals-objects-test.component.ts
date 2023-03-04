import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Context, Signal } from "../merlin-signals";

@Component({
  selector: "app-merlin-signals-objects-test",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4>Leptos Test</h4>
    <div>Count Signal: {{ userSignal.value | json }}</div>
    <br />
    <button (click)="changeName()">Change Name</button>
    <button (click)="changeLastName()">Change LastName</button>
    <button (click)="changeNestedObject()">Change Nested Object</button>
    <button (click)="moreSignalChange()">Fire an event</button>
  `,
  styles: [],
})
export class MerlinSignalsObjectsTestComponent implements OnInit {
  userSignal!: Signal<{
    name: string;
    lastname: string;
    nestedObj: { prop1: string; prop2: string };
  }>;
  moreSignal!: Signal<void>;

  ngOnInit(): void {
    const cx = Context.create();

    this.userSignal = cx.createSignal({
      name: "Merlin",
      lastname: "Mage",
      nestedObj: { prop1: "hello", prop2: "world" },
    });

    this.moreSignal = cx.createSignal(undefined);

    //We can create effects that fire when the signal changes
    cx.createEffect(() => {
      console.log("Effect firing on countSignal", this.userSignal.value);
    });

    //We can create effects that fire when the signal changes
    cx.createEffect(() => {
      this.moreSignal.value;
      console.log("Effect firing on event", this.userSignal.spy);
    });
  }

  changeName() {
    this.userSignal.update((value) => (value.name = "César"));
  }

  changeLastName() {
    const value = this.userSignal.value;
    console.log("WE ARE THE SAME OBJECT", value === this.userSignal.value);
    value.lastname = "Smerling";
    this.userSignal.value = value;
    console.log(
      "WE ARE THE SAME OBJECT AFTER UPDATED",
      value === this.userSignal.value
    );
  }

  changeNestedObject() {
    this.userSignal.update((value) => {
      value.nestedObj.prop1 = "Goodbye";
      value.nestedObj.prop2 = "Universe";
    });
  }

  moreSignalChange() {
    this.moreSignal.value = undefined;
  }
}

function setObjc(value: any) {}
