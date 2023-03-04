import { UserContext } from "./user-context";
import { Injectable } from "@angular/core";
import { delay, filter, lastValueFrom, of, tap } from "rxjs";
import { createAsyncContext } from "../../async-calls";

export type User = {
  user: string;
  token: string;
};

@Injectable({ providedIn: "root" })
export class UsersAsyncsService {
  private userCx = UserContext.cx;
  private userApi = new TestApiService();

  cx = createAsyncContext({
    success: { msg: "" },
    error: { msg: "", error: {} as Error },
  });

  getUser2 = this.cx.run(
    async (userName: string) => {
      const user = await lastValueFrom(this.userApi.getUser(userName));
      this.userCx.signal("currentUser").value = user;
      return { msg: "Success: Getting the user: " + userName };
    },
    ({ args: [userName], error }) => {
      return {
        msg: "Error: Could not get user: " + userName,
        error,
      };
    }
  );
}

const MOCK_USERS: User[] = [
  {
    user: "user1",
    token: "token1",
  },
  {
    user: "user2",
    token: "token2",
  },
  {
    user: "user3",
    token: "token3",
  },
];

class TestApiService {
  getUsers() {
    return of(MOCK_USERS).pipe(
      delay(randomIntFromInterval(500, 1000)),
      tap((x) => {
        if (randomIntFromInterval(0, 25) == 15) {
          throw new Error("Could not get users");
        }
      })
    );
  }

  getUser(user: string) {
    const userDTO = MOCK_USERS.find((d) => d.user === user) ?? MOCK_USERS[0];
    return of(userDTO).pipe(
      filter((user) => !!user),
      delay(randomIntFromInterval(500, 1000)),
      tap((x) => {
        if (randomIntFromInterval(0, 25) == 15) {
          throw new Error("Could not get users");
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
