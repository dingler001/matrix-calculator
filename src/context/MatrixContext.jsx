import { createContext, useContext, useState } from "react";

const MatrixContext = createContext(null);

function createMatrix(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "")
  );
}

export function MatrixProvider({ children }) {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState(() => createMatrix(3));
  const [matrixB, setMatrixB] = useState(() => createMatrix(3));

  const [selectedOperation, setSelectedOperation] =
    useState("Determinant");

  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");

  const [scalarValue, setScalarValue] = useState(2);
  const [powerValue, setPowerValue] = useState(2);
  const [polynomialExpression, setPolynomialExpression] =
    useState("A^2 - 3A + 6I");

  const updateSize = (size) => {
    const nextSize = Number(size);
    setMatrixSize(nextSize);
    setMatrixA(createMatrix(nextSize));
    setMatrixB(createMatrix(nextSize));
    setResult("");
    setSteps(`Matrix resized to ${nextSize}×${nextSize}.`);
  };

  return (
    <MatrixContext.Provider
      value={{
        matrixSize,
        matrixA,
        matrixB,
        setMatrixA,
        setMatrixB,
        updateSize,
        selectedOperation,
        setSelectedOperation,
        result,
        setResult,
        steps,
        setSteps,
        scalarValue,
        setScalarValue,
        powerValue,
        setPowerValue,
        polynomialExpression,
        setPolynomialExpression,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
}

export function useMatrixContext() {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error("useMatrixContext must be used inside MatrixProvider");
  }
  return context;
}