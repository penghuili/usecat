import { useEffect, useReducer, useRef } from "react";

export function createCat(initialValue) {
  let value = initialValue;
  const listeners = new Set();

  const get = () => value;

  const set = (newValue) => {
    if (newValue !== value) {
      const oldValue = value;
      value = newValue;
      listeners.forEach((listener) => listener(oldValue, newValue));
    }
  };

  const reset = () => set(initialValue);

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { get, set, reset, subscribe };
}

export function useCat(cat, selector = (value) => value) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const selectorRef = useRef(selector);

  useEffect(() => {
    selectorRef.current = selector;
  }, [selector]);

  useEffect(() => {
    const handler = (oldValue, newValue) => {
      const oldSlice = selectorRef.current(oldValue);
      const newSlice = selectorRef.current(newValue);
      if (oldSlice !== newSlice) {
        forceUpdate();
      }
    };
    const unsubscribe = cat.subscribe(handler);
    return () => unsubscribe();
  }, [cat]);

  return selector(cat.get());
}
