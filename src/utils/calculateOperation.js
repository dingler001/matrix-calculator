import { determinant } from "./determinant";
import { trace } from "./trace";
import { transpose } from "./transpose";
import { addMatrices } from "./addMatrices";
import { subtractMatrices } from "./subtractMatrices";
import { multiplyMatrices } from "./multiplyMatrices";
import { inverse } from "./inverse";
import { adjoint } from "./adjoint";
import { rank, rowEchelon } from "./rank";
import { matrixPower } from "./matrixPower";
import { scalarMultiply } from "./scalarMultiply";
import { evaluateMatrixPolynomial } from "./matrixPolynomial";
import { eigenvalues } from "./eigenvalues";
import { luDecomposition } from "./luDecomposition";
import { cholesky } from "./cholesky";

const formatNumber = (value) => {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    return String(value);
  }

  const rounded = Math.abs(num) < 1e-12 ? 0 : Number(num.toFixed(4));
  const text = rounded.toFixed(4);
  return text.replace(/\.?0+$/, "");
};

const matrixText = (matrix) =>
  matrix.map((row) => `[ ${row.map(formatNumber).join("  ")} ]`).join("\n");

const withError = (message) => ({
  result: `Error: ${message}`,
  steps: `Error: ${message}`,
});

const matrixDimension = (matrix) => `${matrix.length}×${matrix[0].length}`;

export function calculateOperation(operation, matrixA, matrixB, options = {}) {
  const {
    scalarValue = 2,
    powerValue = 2,
    polynomialExpression = "A^2 - 3A + 6I",
  } = options;

  try {
    switch (operation) {
      case "Matrix Calculator":
        return {
          result: "Matrix calculator ready.",
          steps:
            "Use the sidebar or operation panel to choose a matrix function, then calculate.",
        };

      case "System Of Equations":
      case "AX = B Solver":
      case "AX = B": {
        const inverseA = inverse(matrixA);

        if (typeof inverseA === "string") {
          return {
            result: inverseA,
            steps:
              "Matrix A is singular, so the linear system AX = B does not have a unique solution.",
          };
        }

        const x = multiplyMatrices(inverseA, matrixB);

        return {
          result: x,
          steps: `Solve AX = B by multiplying both sides by A⁻¹.

Matrix A:
${matrixText(matrixA)}

Matrix B:
${matrixText(matrixB)}

Step 1:
Find A⁻¹.

Step 2:
Compute X = A⁻¹B.

A⁻¹:
${matrixText(inverseA)}

Final solution X:
${matrixText(x)}`,
        };
      }

      case "Determinant":
      case "Determinant Calculator": {
        const det = determinant(matrixA);
        const n = matrixA.length;

        let steps = `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

`;

        if (n === 1) {
          steps += `det(A) = ${formatNumber(matrixA[0][0])}`;
        } else if (n === 2) {
          const a = Number(matrixA[0][0]);
          const b = Number(matrixA[0][1]);
          const c = Number(matrixA[1][0]);
          const d = Number(matrixA[1][1]);

          steps += `Use the 2×2 formula:

det(A) = ad - bc

det(A) = (${formatNumber(a)} × ${formatNumber(d)}) - (${formatNumber(
            b
          )} × ${formatNumber(c)})

det(A) = ${formatNumber(a * d)} - ${formatNumber(b * c)}

det(A) = ${formatNumber(det)}`;
        } else if (n === 3) {
          const a = Number(matrixA[0][0]);
          const b = Number(matrixA[0][1]);
          const c = Number(matrixA[0][2]);
          const d = Number(matrixA[1][0]);
          const e = Number(matrixA[1][1]);
          const f = Number(matrixA[1][2]);
          const g = Number(matrixA[2][0]);
          const h = Number(matrixA[2][1]);
          const i = Number(matrixA[2][2]);

          const minor1 = e * i - f * h;
          const minor2 = d * i - f * g;
          const minor3 = d * h - e * g;

          steps += `Use 3×3 cofactor expansion across the first row:

det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)

det(A) = (${formatNumber(a)})(${formatNumber(e)}×${formatNumber(
            i
          )} - ${formatNumber(f)}×${formatNumber(h)})
        - (${formatNumber(b)})(${formatNumber(d)}×${formatNumber(
            i
          )} - ${formatNumber(f)}×${formatNumber(g)})
        + (${formatNumber(c)})(${formatNumber(d)}×${formatNumber(
            h
          )} - ${formatNumber(e)}×${formatNumber(g)})

det(A) = (${formatNumber(a)})(${formatNumber(minor1)})
        - (${formatNumber(b)})(${formatNumber(minor2)})
        + (${formatNumber(c)})(${formatNumber(minor3)})

det(A) = ${formatNumber(det)}`;
        } else {
          steps += `For larger square matrices, the calculator uses elimination to convert the matrix to triangular form and multiplies the pivots.

det(A) = ${formatNumber(det)}`;
        }

        return {
          result: `det(A) = ${formatNumber(det)}`,
          steps,
        };
      }

      case "Trace":
      case "Trace Calculator": {
        const traceResult = trace(matrixA);
        const diagonal = matrixA.map((row, i) => formatNumber(row[i]));

        return {
          result: `Trace(A) = ${formatNumber(traceResult)}`,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Diagonal elements:
${diagonal.join(" + ")}

Trace(A) = ${diagonal.join(" + ")} = ${formatNumber(traceResult)}`,
        };
      }

      case "Transpose":
      case "Transpose Calculator": {
        const transposeResult = transpose(matrixA);

        return {
          result: transposeResult,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Swap rows and columns.

Aᵀ:
${matrixText(transposeResult)}`,
        };
      }

      case "A + B": {
        const result = addMatrices(matrixA, matrixB);

        const detailLines = [];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[0].length; j++) {
            detailLines.push(
              `c${i + 1}${j + 1} = ${formatNumber(matrixA[i][j])} + ${formatNumber(
                matrixB[i][j]
              )} = ${formatNumber(result[i][j])}`
            );
          }
        }

        return {
          result,
          steps: `Matrix A:
${matrixText(matrixA)}

Matrix B:
${matrixText(matrixB)}

Add matching elements one by one:

${detailLines.join("\n")}

Final result:
${matrixText(result)}`,
        };
      }

      case "A - B": {
        const result = subtractMatrices(matrixA, matrixB);

        const detailLines = [];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[0].length; j++) {
            detailLines.push(
              `c${i + 1}${j + 1} = ${formatNumber(matrixA[i][j])} - ${formatNumber(
                matrixB[i][j]
              )} = ${formatNumber(result[i][j])}`
            );
          }
        }

        return {
          result,
          steps: `Matrix A:
${matrixText(matrixA)}

Matrix B:
${matrixText(matrixB)}

Subtract matching elements one by one:

${detailLines.join("\n")}

Final result:
${matrixText(result)}`,
        };
      }

      case "A × B":
      case "A x B":
      case "A * B": {
        const result = multiplyMatrices(matrixA, matrixB);

        const detailLines = [];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[0].length; j++) {
            const terms = [];
            for (let k = 0; k < matrixA[0].length; k++) {
              terms.push(
                `${formatNumber(matrixA[i][k])} × ${formatNumber(matrixB[k][j])}`
              );
            }
            detailLines.push(
              `c${i + 1}${j + 1} = (${terms.join(" + ")}) = ${formatNumber(
                result[i][j]
              )}`
            );
          }
        }

        return {
          result,
          steps: `Matrix A:
${matrixText(matrixA)}

Matrix B:
${matrixText(matrixB)}

Multiply row by column:

${detailLines.join("\n")}

Final result:
${matrixText(result)}`,
        };
      }

      case "Inverse":
      case "Inverse Matrix Calculator": {
        const inverseResult = inverse(matrixA);

        if (typeof inverseResult === "string") {
          return {
            result: inverseResult,
            steps: `Matrix A:
${matrixText(matrixA)}

det(A) = 0, so the matrix is singular and no inverse exists.`,
          };
        }

        const det = determinant(matrixA);

        return {
          result: inverseResult,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Step 1:
Check that det(A) ≠ 0.

det(A) = ${formatNumber(det)}

Step 2:
Form the augmented matrix [A | I].

Step 3:
Use row operations to reduce the left side to the identity matrix.

Step 4:
The right side becomes A⁻¹.

A⁻¹:
${matrixText(inverseResult)}`,
        };
      }

      case "Adjoint":
      case "Adjoint Matrix Calculator": {
        const adj = adjoint(matrixA);

        return {
          result: adj,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Step 1:
Find the minor of every element.

Step 2:
Apply the checkerboard sign pattern.

Step 3:
Transpose the cofactor matrix.

adj(A):
${matrixText(adj)}`,
        };
      }

      case "Rank":
      case "Rank Calculator": {
        const echelon = rowEchelon(matrixA);
        const r = rank(matrixA);

        return {
          result: `Rank(A) = ${r}`,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Row echelon form:
${matrixText(echelon)}

Count the non-zero rows.

Rank(A) = ${r}`,
        };
      }

      case "Row Echelon":
      case "Row Echelon Form": {
        const echelon = rowEchelon(matrixA);

        return {
          result: echelon,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Use row operations to make all entries below each pivot equal to zero.

Row echelon form:
${matrixText(echelon)}`,
        };
      }

      case "Matrix Power":
      case "Matrix Power Calculator": {
        const exponent = Number(powerValue || 2);
        const powered = matrixPower(matrixA, exponent);

        return {
          result: powered,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Compute A^${exponent} by repeated multiplication.

A^${exponent}:
${matrixText(powered)}`,
        };
      }

      case "Scalar Multiply":
      case "Scalar Multiply Calculator": {
        const scaled = scalarMultiply(matrixA, scalarValue);

        return {
          result: scaled,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Multiply every entry by ${formatNumber(scalarValue)}.

${formatNumber(scalarValue)}A:
${matrixText(scaled)}`,
        };
      }

      case "Polynomial Equations":
      case "Polynomial Equations Solver":
      case "Matrix Polynomial": {
        const evaluated = evaluateMatrixPolynomial(
          matrixA,
          polynomialExpression
        );

        return {
          result: evaluated.result,
          steps: `Polynomial expression:
${polynomialExpression}

Breakdown:
${evaluated.breakdown.map((line) => `• ${line}`).join("\n")}

Matrix A:
${matrixText(matrixA)}

Final result:
${matrixText(evaluated.result)}`,
        };
      }

      case "Eigenvalues":
      case "Eigenvalues Calculator": {
        const values = eigenvalues(matrixA);
        const formatted = values.map(formatNumber);

        return {
          result: `Eigenvalues:\n${formatted.map((v, i) => `λ${i + 1} = ${v}`).join("\n")}`,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Eigenvalues are estimated from the characteristic behavior of the matrix.
For 2×2 matrices, the exact formula is used.
For larger matrices, QR iteration is used.

Values:
${formatted.map((v, i) => `λ${i + 1} = ${v}`).join("\n")}`,
        };
      }

      case "LU Decomposition": {
        const { L, U, P } = luDecomposition(matrixA);

        return {
          result: `P:
${matrixText(P)}

L:
${matrixText(L)}

U:
${matrixText(U)}`,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

A is decomposed into:
P × A = L × U

L:
${matrixText(L)}

U:
${matrixText(U)}

P:
${matrixText(P)}`,
        };
      }

      case "Cholesky":
      case "Cholesky Decomposition": {
        const L = cholesky(matrixA);

        return {
          result: L,
          steps: `Matrix A (${matrixDimension(matrixA)}):
${matrixText(matrixA)}

Since A is symmetric positive definite, it can be written as:

A = L × Lᵀ

Lower triangular matrix L:
${matrixText(L)}`,
        };
      }

      default:
        return {
          result: "Select an operation and calculate.",
          steps:
            "Choose an operation from the sidebar or the operations panel, then click Calculate.",
        };
    }
  } catch (error) {
    return withError(error.message);
  }
}