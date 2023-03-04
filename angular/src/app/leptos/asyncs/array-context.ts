import { createContext } from "../ng-signal-context";

export const ArrayContext = createContext({
  asyncValue: [1, 4, 6],
});
