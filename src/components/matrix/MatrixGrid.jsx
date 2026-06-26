import MatrixInput from "./MatrixInput";

export default function MatrixGrid({
  matrix,
  setMatrix,
  matrixName,
}) {
  const navigateTo = (row, col) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= matrix.length ||
      col >= matrix.length
    ) {
      return;
    }

    const target = document.querySelector(
      `[data-matrix="${matrixName}"][data-row="${row}"][data-col="${col}"]`
    );

    if (target) target.focus();
  };

  return (
    <div
      className="grid gap-2.5"
      style={{
        gridTemplateColumns: `repeat(${matrix.length}, minmax(0, 1fr))`,
      }}
    >
      {matrix.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <MatrixInput
            key={`${rowIndex}-${colIndex}`}
            value={value}
            row={rowIndex}
            col={colIndex}
            matrixName={matrixName}
            onNavigate={navigateTo}
            onChange={(newValue) => {
              const updated = matrix.map((r) => [...r]);
              updated[rowIndex][colIndex] = newValue;
              setMatrix(updated);
            }}
          />
        ))
      )}
    </div>
  );
}