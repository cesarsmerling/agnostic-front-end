export type Signal<T> = SignalImpl<T>;

export class Context {
  private _cx: Runtime = new Runtime();

  set cxCallback(cb: () => void) {
    this._cx.callbackConfig = cb;
  }

  static create() {
    return new Context();
  }

  combine<T>(fn: () => T): SignalImpl<T> {
    return this._cx.combine(fn);
  }

  createSignal<T>(value: T): SignalImpl<T> {
    return this._cx.createSignal(value);
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

  clean(element = "context") {
    this._cx.clean(element);
  }
}

type SignalId = number;
type EffectId = number;

class Runtime {
  private _signalValues: SignalImpl<any>[] = [];
  private _runnningEffect!: EffectId;
  private _signalSubscribers: Map<SignalId, Set<EffectId>> = new Map();
  private _effects: (() => void)[] = [];

  callbackConfig: () => void = () => {};

  //will hold the effects for a particular destroyable element (component)
  //serve for clean up effects when that element is destroyed.
  private _effectsInElement = new Map<string, number[]>();

  static create() {
    return new Runtime();
  }

  get signalValues() {
    return this._signalValues;
  }

  get runnningEffect() {
    return this._runnningEffect;
  }

  get signalSubscribers() {
    return this._signalSubscribers;
  }

  combine<T>(fn: () => T): SignalImpl<T> {
    const signal = this.createSignal(undefined as T);
    this.createEffect(() => (signal.value = fn()));
    return signal;
  }

  createSignal<T>(value: T): SignalImpl<T> {
    //The id is the position in the array for signalValues
    const signal = new SignalImpl<T>(this, this._signalValues.length, value);
    this._signalValues.push(signal);

    return signal;
  }
  createEffect(
    fn: () => void,
    { deps, element }: { deps?: Signal<any>[]; element?: string } = {
      deps: [],
      element: "context",
    }
  ) {
    const dependencies = deps || [];
    const registerOnElement = element || "context";

    const id = this._effects.push(fn) - 1;

    if (!this._effectsInElement.has(registerOnElement)) {
      this._effectsInElement.set(registerOnElement, []);
    }

    const effectsInElement = this._effectsInElement.get(registerOnElement);
    if (effectsInElement) {
      effectsInElement.push(id);
    }

    if (!dependencies || dependencies.length === 0) {
      this.runEffect(id);
    } else {
      //Run effect to register the signals into the effect
      // with the id of the real effect
      //Fake effect
      const newFn = () =>
        dependencies.forEach((signal) => {
          const newValue = signal.value;
        });

      //Run the fake effect to register the signals but don't
      //but is never save in the effects stack.
      let prevRunningEffectId = this._runnningEffect;
      this._runnningEffect = id;
      //run the effect
      newFn();
      //pop the effect from the stack
      this._runnningEffect = prevRunningEffectId;
    }
  }

  runEffect(id: EffectId) {
    //push the new effect to the stack
    let prevRunningEffectId = this._runnningEffect;
    this._runnningEffect = id;
    //run the effect
    this._effects[id]();
    //pop the effect from the stack
    this._runnningEffect = prevRunningEffectId;

    // if (this.callbackConfig) {
    //   this.callbackConfig();
    // }
  }

  clean(element = "context") {
    const effectsInElement = this._effectsInElement.get(element);
    if (effectsInElement) {
      effectsInElement.forEach((id) => {
        this._effects[id] = () => {};
      });
    }
  }
}

class SignalImpl<T> {
  private _cx: Runtime;
  private _id: SignalId;
  private _value: T;

  constructor(cx: Runtime, id: SignalId, value: T) {
    this._cx = cx;
    this._id = id;
    this._value = value;
  }

  pipeEffect(cb: () => void): () => void {
    this._cx.createEffect(cb, { deps: [this], element: "pipes" });
    return () => {
      this._cx.clean("pipes");
    };
  }

  get value(): T {
    const value = <T>this._cx.signalValues[this._id]._value;

    if (this._cx.runnningEffect != null) {
      const subs = this._cx.signalSubscribers;
      subs.has(this._id) || subs.set(this._id, new Set());
      subs.get(this._id)?.add(this._cx.runnningEffect);
    }

    // if (this._cx.callbackConfig) {
    //   this._cx.callbackConfig();
    // }

    //Maybe we need to clone the value (wrap in an object or structuredClone)
    return value;
  }

  set value(value: T) {
    this._cx.signalValues[this._id]._value = value;

    //notify subscribers of the effects of this signal
    const subs = this._cx.signalSubscribers.get(this._id);
    if (subs) {
      subs.forEach((id) => this._cx.runEffect(id));
    }

    // if (this._cx.callbackConfig) {
    //   this._cx.callbackConfig();
    // }
  }

  get spy() {
    return this._value;
  }

  update(
    fn: (value: T) => void,
    { runEffects }: { runEffects: boolean } = { runEffects: true }
  ): void {
    if (runEffects) {
      this.value = fn(this._value) as T;
    } else {
      this._value = fn(this._value) as T;
    }
  }
}
