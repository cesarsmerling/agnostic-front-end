import compare from "just-compare";

export class AppUtils {
  static isEqual<T, K>(value1: T, value2: K): boolean {
    return compare(value1, value2);
  }
}
