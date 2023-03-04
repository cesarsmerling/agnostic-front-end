import { NgContext } from "./ng-signal-context";

// type ObservableType<T> = T extends Observable<infer U> ? U : never;
// type PromiseType<T> = T extends Promise<infer U> ? U : never;
// type AsyncRetType<T> = T extends Observable<infer U> ? U : PromiseType<T>;

class AsyncContextMethods {
  //For reject
  private _runningRejacatable: boolean = false;

  //For switch
  private prevPromise!: Promise<any>;

  get isRunning() {
    return this._runningRejacatable;
  }

  reject<T>(asyncCall: () => Promise<T>): Promise<T> {
    if (this._runningRejacatable) {
      return new Promise((res, rej) => {
        rej("Already running a rejacatable async call");
      });
    }
    this._runningRejacatable = true;

    const promise: Promise<T> = new Promise((resolve, reject) => {
      asyncCall()
        .then((value) => {
          resolve(value);
          this._runningRejacatable = false;
        })
        .catch((error) => {
          reject(error);
          this._runningRejacatable = false;
        });
    });

    return promise;
  }

  switch<T>(asyncCall: () => Promise<T>): Promise<T> {
    if (this.prevPromise != null) {
      this.makeCancelable(this.prevPromise).cancel();
    }

    const promise = asyncCall();
    this.prevPromise = promise;

    return promise;
  }

  private makeCancelable(promise: Promise<any>) {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        (value) =>
          isCanceled ? reject({ isCanceled, value }) : resolve(value),
        (error) => reject(error)
      );
    });

    return {
      promise: wrappedPromise,
      cancel() {
        isCanceled = true;
      },
    };
  }
}

class AsyncContext<SuccessObj, ErrorObj> {
  private _cx;

  signal = new NgContext({
    loading: false,
    success: null as SuccessObj,
    error: null as ErrorObj,
  }).signal;

  constructor(options?: { success: SuccessObj; error: ErrorObj }) {
    this._cx = new NgContext({
      loading: false,
      success: options?.success,
      error: options?.error,
    });
    this.signal = this._cx.signal.bind(this._cx);
  }

  run<T extends (...args: any[]) => Promise<void> | Promise<SuccessObj>>(
    runFn: T,
    errFn?: (errorObj: { error: Error; args: Parameters<T> }) => ErrorObj
  ): (...args: Parameters<T>) => void {
    const asyncMethods = new AsyncContextMethods();

    return (...args: Parameters<T>) => {
      this._cx.signal("loading").value = true;
      asyncMethods.switch(() =>
        runFn(...args)
          .then((ret) => {
            if (ret) {
              this._cx.signal("success").value = ret;
            }
            this._cx.signal("loading").value = false;
          })
          .catch((error) => {
            if (errFn) {
              this._cx.signal("error").value = errFn({
                error,
                args,
              });
            }
            this._cx.signal("loading").value = false;
          })
      );
    };
  }
}

export function createAsyncContext<SuccessObj, ErrorObj>(options?: {
  success: SuccessObj;
  error: ErrorObj;
}) {
  return new AsyncContext(options);
  // const cx = new AsyncContext(options);
  // const run = cx.run.bind(cx);
  // return {
  //   cx: cx,
  //   run,
  // };
}
