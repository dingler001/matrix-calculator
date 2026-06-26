import { multiplyMatrices } from "./multiplyMatrices";

export function matrixPower(matrix, exponent = 2) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Matrix power requires a square matrix.");
  }

  if (exponent === 0) {
    return matrix.map((row, i) =>
      row.map((_, j) => (i === j ? 1 : 0))
    );
  }

  let result = matrix.map((row) => row.map(Number));

  for (let i = 1; i < exponent; i++) {
    result = multiplyMatrices(result, matrix);
  }

  return result;
}