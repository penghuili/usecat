declare module "usecat" {
  export function createCat<T>(initialValue: T): {
    get: () => T;
    set: (newValue: T | ((prevValue: T) => T)) => void;
    reset: () => void;
    subscribe: (listener: () => void) => () => void;
  };

  export function useCat<T>(
    cat: ReturnType<typeof createCat<T>>
  ): [T, (newValue: T | ((prevValue: T) => T)) => void];

  export function resetAllCats(): void;
}
