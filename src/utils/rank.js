export function rowEchelon(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("Row echelon requires a matrix.");
  }

  const m = matrix.map((row) => row.map(Number));
  const rows = m.length;
  const cols = m[0].length;
  const EPS = 1e-12;

  let lead = 0;

  for (let r = 0; r < rows && lead < cols; r++) {
    let i = r;

    while (i < rows && Math.abs(m[i][lead]) < EPS) {
      i++;
    }

    if (i === rows) {
      lead++;
      r--;
      continue;
    }

    [m[i], m[r]] = [m[r], m[i]];

    const pivot = m[r][lead];
    if (Math.abs(pivot) > EPS) {
      for (let j = lead; j < cols; j++) {
        m[r][j] /= pivot;
      }
    }

    for (let i2 = r + 1; i2 < rows; i2++) {
      const factor = m[i2][lead];
      for (let j = lead; j < cols; j++) {
        m[i2][j] -= factor * m[r][j];
      }
    }

    lead++;
  }

  return m;
}

export function rank(matrix) {
  const echelon = rowEchelon(matrix);
  return echelon.filter((row) =>
    row.some((value) => Math.abs(value) > 1e-10)
  ).length;
}