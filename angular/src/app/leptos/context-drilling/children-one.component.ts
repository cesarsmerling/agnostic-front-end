import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Signal } from "../merlin-signals";
import { DrillingContext } from "./context";

@Component({
  selector: "app-children-one",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="margin-block: 2rem">
      <h4>Child one</h4>
      <p>I only fires effect with the signals and the button</p>
      <button (click)="handleClick()">Child One</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildrenOneComponent implements OnInit {
  private cx = DrillingContext.cx;

  private mySignal: Signal<string> = this.cx.signal("childOne");

  ngOnInit(): void {
    this.cx.createEffect(
      () => {
        this.cx.signal("parent").value =
          <number>this.cx.signal("parent").spy + 1;
        console.log(
          "CHILD ONE: when my signal changes I sum 1 to the parent signal",
          this.cx.signal("parent").spy
        );
      },
      { deps: [this.mySignal] }
    );
  }

  handleClick() {
    this.mySignal.value = "Hi Parent I changed your value!";
  }
}
