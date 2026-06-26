function isSquare(matrix) {
  return (
    Array.isArray(matrix) &&
    matrix.length > 0 &&
    matrix.every((row) => Array.isArray(row) && row.length === matrix.length)
  );
}

export function determinant(matrix) {
  if (!isSquare(matrix)) {
    throw new Error("Determinant requires a square matrix.");
  }

  const n = matrix.length;
  const m = matrix.map((row) => row.map(Number));

  if (n === 1) {
    return m[0][0];
  }

  let det = 1;
  let sign = 1;

  for (let col = 0; col < n; col++) {
    let pivot = col;

    for (let row = col; row < n; row++) {
      if (Math.abs(m[row][col]) > Math.abs(m[pivot][col])) {
        pivot = row;
      }
    }

    if (Math.abs(m[pivot][col]) < 1e-12) {
      return 0;
    }

    if (pivot !== col) {
      [m[pivot], m[col]] = [m[col], m[pivot]];
      sign *= -1;
    }

    const pivotVal = m[col][col];
    det *= pivotVal;

    for (let row = col + 1; row < n; row++) {
      const factor = m[row][col] / pivotVal;
      for (let j = col; j < n; j++) {
        m[row][j] -= factor * m[col][j];
      }
    }
  }

  return det * sign;
}