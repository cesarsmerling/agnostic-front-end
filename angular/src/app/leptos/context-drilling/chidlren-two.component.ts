import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChidlrenThreeComponent } from "./chidlren-three.component";
import { Signal } from "../merlin-signals";
import { DrillingContext } from "./context";

@Component({
  selector: "app-children-two",
  standalone: true,
  template: `
    <div style="margin-block: 2rem">
      <h4>CHILD TWO</h4>
      <button (click)="handleClick()">Child Two</button>
      <p>Singal "childTwo": {{ signalTwo.value }}</p>
      <app-children-three
        style="display:block; margin-inline: 2rem"
      ></app-children-three>
    </div>
  `,
  styles: [],
  imports: [CommonModule, ChidlrenThreeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChidlrenTwoComponent implements OnInit {
  private cx = DrillingContext.cx;

  signalTwo: Signal<number> = this.cx.signal("childTwo");

  ngOnInit(): void {
    this.cx.createEffect(
      () => {
        this.cx.signal("parent").value =
          <number>this.cx.signal("parent").spy + this.signalTwo.value;
        console.log(
          "CHILD TWO: when my signal changes I sum 5 to the parent signal",
          this.cx.signal("parent").spy
        );
      },
      { deps: [this.signalTwo] }
    );
  }

  handleClick() {
    this.signalTwo.update((value) => (value = value + 5));
  }
}
