function cloneMatrix(matrix) {
  return matrix.map((row) => row.map(Number));
}

function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

function norm(v) {
  return Math.sqrt(dot(v, v));
}

function multiplyMatrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function getColumn(matrix, col) {
  return matrix.map((row) => Number(row[col]));
}

function setColumn(matrix, col, values) {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][col] = values[i];
  }
}

function transpose(matrix) {
  return matrix[0].map((_, c) => matrix.map((row) => Number(row[c])));
}

function multiplyMatrices(a, b) {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;

  const result = Array.from({ length: rowsA }, () =>
    Array.from({ length: colsB }, () => 0)
  );

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += Number(a[i][k]) * Number(b[k][j]);
      }
    }
  }

  return result;
}

function qrDecomposition(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;

  const Q = Array.from({ length: n }, () => Array.from({ length: m }, () => 0));
  const R = Array.from({ length: m }, () => Array.from({ length: m }, () => 0));

  const qCols = [];

  for (let j = 0; j < m; j++) {
    let v = getColumn(matrix, j);

    for (let i = 0; i < j; i++) {
      const qi = qCols[i];
      R[i][j] = dot(qi, getColumn(matrix, j));
      v = v.map((x, idx) => x - R[i][j] * qi[idx]);
    }

    const vNorm = norm(v);
    if (vNorm < 1e-12) {
      const zeroCol = Array.from({ length: n }, () => 0);
      qCols.push(zeroCol);
      continue;
    }

    const qj = v.map((x) => x / vNorm);
    qCols.push(qj);
    R[j][j] = vNorm;
  }

  for (let j = 0; j < m; j++) {
    setColumn(Q, j, qCols[j] || Array.from({ length: n }, () => 0));
  }

  return { Q, R };
}

function offDiagonalNorm(matrix) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i !== j) sum += matrix[i][j] * matrix[i][j];
    }
  }
  return Math.sqrt(sum);
}

function formatNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  const rounded = Math.abs(num) < 1e-12 ? 0 : Number(num.toFixed(6));
  return rounded.toFixed(6).replace(/\.?0+$/, "");
}

export function eigenvalues(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Eigenvalues require a square matrix.");
  }

  const n = matrix.length;
  const A = cloneMatrix(matrix);

  if (n === 1) {
    return [Number(A[0][0])];
  }

  if (n === 2) {
    const a = A[0][0];
    const b = A[0][1];
    const c = A[1][0];
    const d = A[1][1];

    const tr = a + d;
    const det = a * d - b * c;
    const disc = tr * tr - 4 * det;

    if (disc >= 0) {
      const root = Math.sqrt(disc);
      return [(tr + root) / 2, (tr - root) / 2];
    }

    return [
      `${formatNumber(tr / 2)} + ${formatNumber(Math.sqrt(-disc) / 2)}i`,
      `${formatNumber(tr / 2)} - ${formatNumber(Math.sqrt(-disc) / 2)}i`,
    ];
  }

  let Ak = A;

  for (let iter = 0; iter < 80; iter++) {
    const { Q, R } = qrDecomposition(Ak);
    Ak = multiplyMatrices(R, Q);

    if (offDiagonalNorm(Ak) < 1e-10) {
      break;
    }
  }

  return Ak.map((row, i) => row[i]);
}