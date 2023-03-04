import { computed, Signal, signal } from "@preact/signals";

function asyncEffect<T, E>(
  loading$: Signal<boolean>,
  error$: Signal<E | null>,
  data$: Signal<T | null>,
  fetchCallback: () => Promise<T>,
  errorFn?: (error?: any) => E
) {
  return async () => {
    loading$.value = true;
    try {
      data$.value = await fetchCallback();
      loading$.value = false;
    } catch (error) {
      error$.value = errorFn ? errorFn(error) : <E>error;
      loading$.value = false;
      console.error(error);
    }
  };
}

export const asyncSignal = <T, E>(
  initialState: T,
  asyncFn: () => Promise<T>,
  errorFn?: (error?: any) => E
) => {
  const data$ = signal<T | null>(initialState);
  const error$ = signal<E | null>(null);
  const loading$ = signal<boolean>(false);

  const state = computed(() => {
    return { data: data$.value, loading: loading$.value, error: error$.value };
  });
  const run = asyncEffect(loading$, error$, data$, asyncFn, errorFn);

  return { state, run };
};
