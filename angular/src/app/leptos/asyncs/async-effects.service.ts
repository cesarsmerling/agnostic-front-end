import { UserContext } from "./app-contexts/user-context";
import { ArrayContext } from "./array-context";
import { Injectable } from "@angular/core";

@Injectable()
export class AsyncEffectsService {
  //TODO: See to inject context via an injector
  //Create utilities to create injectors
  private arrayCx = ArrayContext.cx;
  private userCx = UserContext.cx;
  private asyncCx = {}; //TODO: Utilities for the async calls. Loading, success and error.

  rejectTest() {}

  switchTest() {}

  concatTest() {}

  mergeTest() {}
}
