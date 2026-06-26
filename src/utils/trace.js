export function trace(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Trace requires a square matrix.");
  }

  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    sum += Number(matrix[i][i]);
  }
  return sum;
}