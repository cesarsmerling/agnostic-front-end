import { signal, effect } from "@preact/signals";

export const userName = signal<string>("initialUser");
export const isLoggedIn = signal<boolean>(false);

export const fakeLogin = (name: string) => {
  return new Promise<boolean>((res, rej) => {
    if (name === "admin") res(true);
    else rej(false);
  });
};

export const loginUser2 = () =>
  effect(async () => {
    try {
      console.log("UPDATING LOGIN", isLoggedIn.peek(), userName.peek());
      isLoggedIn.value = await fakeLogin(userName.value);
    } catch (error) {
      console.error(error);
      isLoggedIn.value = false;
    }
  });

// export const loginUser3 = async () => {
//   try {
//     isLoggedIn.value = await fakeLogin(userName.value);
//     console.log("UPDATING LOGIN", isLoggedIn.value, userName.value);
//   } catch (error) {
//     console.error(error);
//   }
// };

export class RootSignal {
  get userName() {
    return userName.value;
  }

  set userName(name: string) {
    userName.value = name;
  }
}

interface RootState {
  userName: string;
  isLoggedIn: boolean;
}

const initialState: RootState = {
  userName: "",
  isLoggedIn: false,
};

export const root$ = signal<RootState>(initialState);

export const resetState = () => (root$.value = initialState);

export const updateName = (name: string) => {
  root$.value = {
    ...root$.value,
    userName: name,
  };
};

export const updateLogin = (isLoggedIn: boolean) => {
  root$.value = {
    ...root$.value,
    isLoggedIn,
  };
};

// export const loginUser = (name: string) =>
//   effect(async () => {
//     try {
//       const isLoggedIn = await fakeLogin(root$.value.userName);
//       updateLogin(isLoggedIn);
//       console.log("UPDATING LOGIN", root$.peek());
//     } catch (error) {
//       console.error(error);
//     }
//   });
