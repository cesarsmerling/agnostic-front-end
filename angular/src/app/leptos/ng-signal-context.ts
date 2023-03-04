import {
  ChangeDetectorRef,
  inject,
  InjectionToken,
  Provider,
} from "@angular/core";
import { Context, Signal } from "./merlin-signals";

export class NgContext<
  T extends {},
  K extends keyof T,
  SignalObj = {
    [P in K]: Signal<T[P]>;
  }
> {
  private _cx: Context = new Context();
  private _signals!: SignalObj;

  private _initialState: T;

  constructor(initialState: T, cb?: () => void) {
    this._initialState = structuredClone(initialState);
    if (cb) this._cx.cxCallback = cb;
    this.init(initialState);
  }

  signal<S extends keyof SignalObj>(signalName: S) {
    const signal = this._signals[signalName];
    if (!signal) {
      throw new Error(`Signal ${signalName as string} not found`);
    }
    return signal;
  }

  combine<T>(fn: () => T): Signal<T> {
    return this._cx.combine(fn);
  }

  createEffect(
    fn: () => void,
    options: { deps?: Signal<any>[]; element?: string } = {
      deps: [],
      element: "context",
    }
  ) {
    return this._cx.createEffect(fn, options);
  }

  reset(params: { runEffects: boolean } = { runEffects: true }) {
    Object.keys(this._initialState).forEach((key) => {
      const signal = this._signals[key as keyof SignalObj] as Signal<any>;
      signal.update(
        () => structuredClone(this._initialState[key as keyof T]),
        params
      );
    });
  }

  clean(element = "context") {
    this._cx.clean(element);
  }

  private init(initialState: T) {
    this._signals = {} as any;
    Object.keys(initialState).forEach((key) => {
      const signal = this._cx.createSignal(initialState[key as keyof T]);
      this._signals[key as keyof SignalObj] = <any>signal;
    });
  }
}

export function createContext<T extends {}>(
  intitialState: T,
  contextName?: string
) {
  const token = new InjectionToken<NgContext<T, keyof T>>(
    contextName || "context_" + UUID()
  );
  const provider: Provider = {
    provide: token,
    useFactory: () => {
      return new NgContext<T, keyof T>(intitialState);
    },
  };

  const accessor = {
    get cx() {
      return inject(token);
    },
    get provider() {
      return provider;
    },
  };

  return accessor;
}

//Generate UUID
function random4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function UUID(): string {
  return (
    random4() +
    random4() +
    random4() +
    random4() +
    random4() +
    random4() +
    random4() +
    random4()
  );
}
