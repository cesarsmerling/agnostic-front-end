import { signal } from "@preact/signals";
import { Observable } from "rxjs";

export const createSignal = <T>(obs: Observable<T>) => {
  const s = signal(<T>null);
  obs.subscribe((v) => (s.value = v));
  return s;
};
