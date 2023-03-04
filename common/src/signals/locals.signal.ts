import { getLocals } from "../api/locals";
import { asyncSignal } from "./signals";

export const loadLocals = asyncSignal(
  null,
  () => getLocals(),
  () => "Could not load locals. Please try again."
);
