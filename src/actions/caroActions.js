export const X_NEXT = "X_NEXT";
export const HISTORY = "HISTORY";
export const WIDTH = "WIDTH";
export const HEIGHT = "HEIGHT";
export const STEP = "STEP";
export const SORT = "SORT";
export const POSITIONS = "POSITIONS";

export function xNext(bool) {
  return { type: X_NEXT, bool };
}

export function history(squares) {
  return { type: HISTORY, squares };
}

export function width(value) {
  return { type: WIDTH, value };
}

export function height(value) {
  return { type: HEIGHT, value };
}

export function step(number) {
  return { type: STEP, number };
}

export function sort(value) {
  return { type: SORT, value };
}

export function positions(number) {
  return { type: POSITIONS, number };
}
