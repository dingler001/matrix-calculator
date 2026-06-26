export function addMatrices(matrixA, matrixB) {
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    throw new Error("Matrices must have the same size.");
  }

  return matrixA.map((row, i) =>
    row.map((value, j) => Number(value) + Number(matrixB[i][j]))
  );
}