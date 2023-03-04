export const createAsyncContext = (fetchFn: () => Promise<any>, data: any) => {
  const ctx = context(data);

  const run = async () => {
    ctx.loading = true;
    try {
      ctx.data = await fetchFn();
      ctx.loaded = true;
    } catch (error) {
      ctx.error = error;
    } finally {
      ctx.loading = false;
    }
    return ctx;
  };

  run();

  return ctx;
};

const context = (data: any) => ({
  value: {
    loading: false,
    loaded: false,
    data: data,
    error: null,
  },

  get val() {
    return { ...this.value };
  },

  get loading() {
    return this.value.loading;
  },

  set loading(loading: boolean) {
    this.value = {
      ...this.value,
      loading,
    };
  },

  get loaded() {
    return this.value.loaded;
  },

  set loaded(loaded: boolean) {
    this.value = {
      ...this.value,
      loaded,
    };
  },

  get data() {
    return this.value.data;
  },

  set data(data: any) {
    this.value = {
      ...this.value,
      data,
    };
  },

  get error() {
    return this.value.error;
  },

  set error(error: any) {
    this.value = {
      ...this.value,
      error,
    };
  },
});
