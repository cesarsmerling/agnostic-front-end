import { Injectable } from "@angular/core";
import { computed, signal } from "@preact/signals";

@Injectable({
  providedIn: "root",
})
export class DataTestService {
  s1$ = signal("Start");
  s2$ = signal(30);
  s3$ = computed(() => this.s1$.value + " and other " + this.s2$.value);

  constructor() {}
}
