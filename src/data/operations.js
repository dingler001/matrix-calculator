import { determinant } from "./determinant";
import { trace } from "./trace";
import { transpose } from "./transpose";

export function calculateOperation(
  operation,
  matrixA,
  matrixB
) {
  switch (operation) {
    case "Determinant":
      return {
        result: `det(A) = ${determinant(matrixA)}`,
        steps:
          "Applied determinant formula successfully.",
      };

    case "Trace":
      const traceResult = trace(matrixA);

      return {
        result: `Trace(A) = ${traceResult}`,
        steps: `
Step 1

Take diagonal elements

Step 2

Add them together

Final Answer

Trace(A) = ${traceResult}
        `,
      };

    case "Transpose":
      const transposeResult =
        transpose(matrixA);

      return {
        result: JSON.stringify(
          transposeResult
        ),
        steps: `
Step 1

Swap rows and columns

Step 2

Construct transposed matrix

Transpose completed.
        `,
      };

    case "Inverse":
      return {
        result: "Coming Soon",
        steps: "Inverse not implemented yet.",
      };

    case "Adjoint":
      return {
        result: "Coming Soon",
        steps: "Adjoint not implemented yet.",
      };

    case "Rank":
      return {
        result: "Coming Soon",
        steps: "Rank not implemented yet.",
      };

    default:
      return {
        result: "Coming Soon",
        steps: "Operation not implemented yet.",
      };
  }
}