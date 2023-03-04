import { createContext } from "../ng-signal-context";

const contextTest = {
  parent: 0,
  childOne: "Child One",
  childTwo: 0,
  nestedChild: "Nested Child",
  invisible: {
    name: "Invisible",
  },
};

export const DrillingContext = createContext(contextTest);
