export function scalarMultiply(matrix, scalar) {
  const s = Number(scalar);

  if (!Number.isFinite(s)) {
    throw new Error("Scalar must be a valid number.");
  }

  return matrix.map((row) => row.map((value) => Number(value) * s));
}