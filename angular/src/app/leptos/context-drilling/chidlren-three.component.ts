import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DrillingContext } from "./context";
import { Signal } from "../merlin-signals";
import { ValuePipe } from "../value.pipe";

@Component({
  selector: "app-children-three",
  standalone: true,
  imports: [CommonModule, ValuePipe],
  template: `
    <div style="margin-block: 2rem">
      <h4>CHILD THREE</h4>
      <p>I update my value but avoid firing effects</p>
      <button (click)="handleClick()">Child Three</button>
      <button (click)="resetState()">RESET!! DON'T TOUCH ME</button>
      <p>Singal "nestedChild": {{ signalThree.value }}</p>
      <p>
        Singal "Invisible": {{ invisibleSignal | value | json }}
        {{ invisibleSignal.value | json }}
      </p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChidlrenThreeComponent {
  private cx = DrillingContext.cx;

  signalThree: Signal<string> = this.cx.signal("nestedChild");
  invisibleSignal = this.cx.signal("invisible");

  handleClick() {
    this.signalThree.update((value) => (value = value + " ? "), {
      runEffects: false,
    });

    setTimeout(
      () =>
        this.invisibleSignal.update((value) => {
          value.name = "I'm fired in a timeout" + Math.random();
          return value;
        }),
      1000
    );
  }

  resetState() {
    this.cx.reset({ runEffects: false });
  }
}
