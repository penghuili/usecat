import { useEffect, useReducer } from 'react';

const cats = [];

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

  const cat = { get, set, reset, subscribe };
  cats.push(cat);

  return cat;
}

export function useCat(cat, selector = (value) => value) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const handler = (oldValue, newValue) => {
      const oldSlice = selector(oldValue);
      const newSlice = selector(newValue);
      if (oldSlice !== newSlice) {
        forceUpdate();
      }
    };
    const unsubscribe = cat.subscribe(handler);
    return () => unsubscribe();
  }, [cat]);

  return selector(cat.get());
}
