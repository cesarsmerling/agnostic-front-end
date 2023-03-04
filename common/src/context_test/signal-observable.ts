import { signal } from "@preact/signals-core";
import { Observable } from "rxjs";

export const ofSignal = <T>(value: Observable<T>) => {
  const newSignal = signal<T>(<T>"");
  const sub = value.subscribe((v) => {
    newSignal.value = v;
  });
  return { signal: newSignal, destroy: () => sub.unsubscribe() };
};
