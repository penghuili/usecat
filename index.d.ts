declare module "usecat" {
  export interface Cat<T> {
    get: () => T;
    set: (newValue: T) => void;
    reset: () => void;
  }

  export function createCat<T>(initialValue: T): Cat<T>;

  export function useCat<T, U = T>(cat: Cat<T>, selector?: (value: T) => U): U;

  export function resetAllCats(): void;
}
