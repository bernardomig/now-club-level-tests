import { Dispatch, useEffect, useState } from "react";

export function usePersistState<K>(
  key: string,
  initialState: K
): [K, Dispatch<K>, () => void] {
  const [state, setState] = useState<K>(() => {
    const storedValue = localStorage.getItem(key);

    return JSON.parse(storedValue) ?? initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  function clearState() {
    localStorage.removeItem(key);
  }

  return [state, setState, clearState];
}
