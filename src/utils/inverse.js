import { determinant } from "./determinant";

export function inverse(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Inverse requires a square matrix.");
  }

  const n = matrix.length;
  const det = determinant(matrix);

  if (Math.abs(det) < 1e-12) {
    return "Matrix is singular (no inverse).";
  }

  const aug = matrix.map((row, i) => [
    ...row.map(Number),
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  for (let col = 0; col < n; col++) {
    let pivot = col;

    for (let row = col; row < n; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[pivot][col])) {
        pivot = row;
      }
    }

    if (Math.abs(aug[pivot][col]) < 1e-12) {
      return "Matrix is singular (no inverse).";
    }

    if (pivot !== col) {
      [aug[pivot], aug[col]] = [aug[col], aug[pivot]];
    }

    const pivotVal = aug[col][col];

    for (let j = 0; j < 2 * n; j++) {
      aug[col][j] /= pivotVal;
    }

    for (let row = 0; row < n; row++) {
      if (row === col) continue;

      const factor = aug[row][col];
      for (let j = 0; j < 2 * n; j++) {
        aug[row][j] -= factor * aug[col][j];
      }
    }
  }

  return aug.map((row) => row.slice(n));
}