import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChildrenOneComponent } from "./children-one.component";
import { ChidlrenTwoComponent } from "./chidlren-two.component";
import { DrillingContext } from "./context";

@Component({
  selector: "app-parent-context",
  standalone: true,
  template: `
    <h3>Parent with context</h3>
    <b>
      I'm the parent, I have two childrens that could use the cx with signals
    </b>
    <p>This is my signal(parentSignal): {{ parentSignal.value }}</p>
    <app-children-one
      style="display:block; margin-inline: 2rem"
    ></app-children-one>
    <app-children-two
      style="display:block; margin-inline: 2rem"
    ></app-children-two>
  `,
  styles: [],
  imports: [CommonModule, ChildrenOneComponent, ChidlrenTwoComponent],
  providers: [DrillingContext.provider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentContextComponent implements OnInit, OnDestroy {
  private cx = DrillingContext.cx;

  parentSignal = this.cx.signal("parent");
  childOneSignal = this.cx.signal("childOne");
  childTwoSignal = this.cx.signal("childTwo");
  nestedChildSignal = this.cx.signal("nestedChild");

  ngOnInit(): void {
    const effectChild = this.cx.combine(() => {
      this.childOneSignal.value;
      this.childTwoSignal.value;
      this.nestedChildSignal.value;
      return "DERIVED SIGNAL";
    });

    this.cx.createEffect(() => {
      console.log(
        "PARENT: I combine all the signals into one",
        effectChild.value
      );
    });

    this.cx.createEffect(() => {
      console.log(
        "PARENT: my signal is changing somewhere",
        this.parentSignal.value
      );
    });
  }

  ngOnDestroy(): void {}
}
