import { Injectable } from "@angular/core";
import { delay, of, tap, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class TestApiService {
  constructor() {}

  getValues() {
    of([3, 8, 9]).pipe(
      delay(randomIntFromInterval(15, 300)),
      tap((x) => {
        if (randomIntFromInterval(0, 25) == 15) {
          throw new Error("Random Error");
        }
      })
    );
  }
}

//Copied from stackoverflow
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
