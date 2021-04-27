import { renderHook, act } from "@testing-library/react-hooks";
import { usePersistState } from "./persist-state-hook";

beforeEach(() => {
  localStorage.clear();
});

test("starts with initial state", () => {
  const { result } = renderHook(() => usePersistState("key", 0));

  expect(result.current[0]).toBe(0);
});

test("changes state with `setState`", () => {
  const { result } = renderHook(() => usePersistState("key", 0));

  act(() => {
    result.current[1](10);
  });

  expect(result.current[0]).toBe(10);
});

test("starts with saved state in localStorage if exists", () => {
  const KEY = "key";

  localStorage.setItem(KEY, JSON.stringify(10));

  const { result } = renderHook(() => usePersistState(KEY, 9999));

  expect(result.current[0]).toBe(10);
});

test("clears the localStorage if `clearState` is called", () => {
  const KEY = "key";

  localStorage.setItem(KEY, JSON.stringify(10));

  const { result } = renderHook(() => usePersistState(KEY, 9999));

  act(() => {
    result.current[2]();
  });

  expect(localStorage.getItem(KEY)).toBeNull();
});

test("updates the localStorage if `setState` is called", () => {
  const KEY = "key";

  const { result } = renderHook(() => usePersistState(KEY, 9999));

  expect(localStorage.getItem(KEY)).toBe(JSON.stringify(9999));
});
