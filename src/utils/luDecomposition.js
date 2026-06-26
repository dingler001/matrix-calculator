function identityMatrix(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

function zeroMatrix(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
}

export function luDecomposition(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("LU decomposition requires a square matrix.");
  }

  const n = matrix.length;
  const A = matrix.map((row) => row.map(Number));
  const L = identityMatrix(n);
  const U = zeroMatrix(n);
  const P = identityMatrix(n);

  for (let i = 0; i < n; i++) {
    let pivotRow = i;
    let maxVal = Math.abs(A[i][i]);

    for (let r = i + 1; r < n; r++) {
      const val = Math.abs(A[r][i]);
      if (val > maxVal) {
        maxVal = val;
        pivotRow = r;
      }
    }

    if (maxVal < 1e-12) {
      throw new Error("Matrix is singular or nearly singular; LU failed.");
    }

    if (pivotRow !== i) {
      [A[i], A[pivotRow]] = [A[pivotRow], A[i]];
      [P[i], P[pivotRow]] = [P[pivotRow], P[i]];

      for (let k = 0; k < i; k++) {
        [L[i][k], L[pivotRow][k]] = [L[pivotRow][k], L[i][k]];
      }
    }

    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[i][k] * U[k][j];
      }
      U[i][j] = A[i][j] - sum;
    }

    for (let j = i + 1; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[j][k] * U[k][i];
      }
      L[j][i] = (A[j][i] - sum) / U[i][i];
    }
  }

  return { P, L, U };
}