import { useState } from "react";

export default function useMatrix() {
  const [matrixSize, setMatrixSize] = useState(3);
const [result, setResult] = useState("");
const [steps, setSteps] = useState("");
  const createMatrix = (size) =>
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(""));

  const [matrixA, setMatrixA] = useState(createMatrix(3));
  const [matrixB, setMatrixB] = useState(createMatrix(3));
const [selectedOperation, setSelectedOperation] =
  useState("Determinant");
  const updateSize = (size) => {
    const newSize = Number(size);

    setMatrixSize(newSize);
    setMatrixA(createMatrix(newSize));
    setMatrixB(createMatrix(newSize));
  };

  return {
    matrixSize,
    matrixA,
    matrixB,
    setMatrixA,
    setMatrixB,
    updateSize,
    selectedOperation,
setSelectedOperation,
    result,
steps,
setResult,
setSteps,
  };
}