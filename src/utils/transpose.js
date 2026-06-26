export function transpose(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("Transpose requires a matrix.");
  }

  return matrix[0].map((_, colIndex) =>
    matrix.map((row) => Number(row[colIndex]))
  );
}