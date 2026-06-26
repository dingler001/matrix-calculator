export function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;

  if (colsA !== rowsB) {
    throw new Error(
      "Number of columns in Matrix A must equal number of rows in Matrix B."
    );
  }

  const result = Array.from({ length: rowsA }, () =>
    Array.from({ length: colsB }, () => 0)
  );

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += Number(matrixA[i][k]) * Number(matrixB[k][j]);
      }
    }
  }

  return result;
}