import { createContext } from "../../ng-signal-context";
import { User } from "./user-async";

export const UserContext = createContext({
  users: [] as User[],
  currentUser: {} as User,
});
