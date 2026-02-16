import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;

      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn("localStorage read error", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
    } catch (error) {
      console.warn("localStorage set error", error);
    }
  };

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("localStorage save error", error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}
