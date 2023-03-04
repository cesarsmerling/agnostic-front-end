import {
  ChangeDetectorRef,
  inject,
  InjectFlags,
  OnDestroy,
  Pipe,
  PipeTransform,
  ViewContainerRef,
} from "@angular/core";
import { Signal } from "./merlin-signals";
import { NgContext } from "./ng-signal-context";

@Pipe({
  name: "value",
  standalone: true,
  pure: true,
})
export class ValuePipe implements PipeTransform, OnDestroy {
  private ref = inject(ChangeDetectorRef);

  private clean!: () => void;

  transform<T>(signal: Signal<T>): T {
    this.clean = signal.pipeEffect(() => {
      this.ref.markForCheck();
    });

    return signal.value;
  }

  ngOnDestroy() {
    this.clean();
  }
}
