import { determinant } from "./determinant";

function minor(matrix, rowToRemove, colToRemove) {
  return matrix
    .filter((_, rowIndex) => rowIndex !== rowToRemove)
    .map((row) =>
      row.filter((_, colIndex) => colIndex !== colToRemove)
    );
}

export function adjoint(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Adjoint requires a square matrix.");
  }

  const n = matrix.length;

  if (n === 1) {
    return [[1]];
  }

  const cofactors = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      cofactors[i][j] =
        sign * determinant(minor(matrix, i, j));
    }
  }

  return cofactors[0].map((_, colIndex) =>
    cofactors.map((row) => row[colIndex])
  );
}