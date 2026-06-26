export function cholesky(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Cholesky decomposition requires a square matrix.");
  }

  const n = matrix.length;
  const A = matrix.map((row) => row.map(Number));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (Math.abs(A[i][j] - A[j][i]) > 1e-10) {
        throw new Error("Matrix must be symmetric for Cholesky decomposition.");
      }
    }
  }

  const L = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }

      if (i === j) {
        const value = A[i][i] - sum;
        if (value <= 0) {
          throw new Error(
            "Matrix is not positive definite, so Cholesky does not exist."
          );
        }
        L[i][j] = Math.sqrt(value);
      } else {
        L[i][j] = (A[i][j] - sum) / L[j][j];
      }
    }
  }

  return L;
}