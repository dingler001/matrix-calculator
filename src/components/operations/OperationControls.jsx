import { useMatrixContext } from "../../context/MatrixContext";

export default function OperationControls() {
  const {
    selectedOperation,
    scalarValue,
    setScalarValue,
    powerValue,
    setPowerValue,
    polynomialExpression,
    setPolynomialExpression,
  } = useMatrixContext();

  const needsScalar = selectedOperation === "Scalar Multiply";
  const needsPower = selectedOperation === "Matrix Power";
  const needsPolynomial = selectedOperation === "Polynomial Equations";

  if (!needsScalar && !needsPower && !needsPolynomial) {
    return null;
  }

  return (
    <div className="
      rounded-2xl
      border
      border-[var(--panel-border)]
      bg-[var(--panel-bg)]
      backdrop-blur-xl
      p-5
      mt-6
    ">
      <h3 className="text-[var(--text-main)] text-lg font-semibold mb-4">
        Operation Settings
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {needsScalar && (
          <label className="block">
            <span className="block text-[var(--text-muted)] mb-2 text-sm">
              Scalar value
            </span>
            <input
              type="number"
              step="any"
              value={scalarValue}
              onChange={(e) => setScalarValue(e.target.value)}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[var(--input-bg)]
                border
                border-[var(--input-border)]
                text-[var(--text-main)]
                outline-none
              "
            />
          </label>
        )}

        {needsPower && (
          <label className="block">
            <span className="block text-[var(--text-muted)] mb-2 text-sm">
              Power exponent
            </span>
            <input
              type="number"
              step="1"
              min="0"
              value={powerValue}
              onChange={(e) => setPowerValue(e.target.value)}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[var(--input-bg)]
                border
                border-[var(--input-border)]
                text-[var(--text-main)]
                outline-none
              "
            />
          </label>
        )}

        {needsPolynomial && (
          <label className="block md:col-span-2">
            <span className="block text-[var(--text-muted)] mb-2 text-sm">
              Polynomial expression
            </span>
            <input
              type="text"
              value={polynomialExpression}
              onChange={(e) => setPolynomialExpression(e.target.value)}
              placeholder="A^2 - 3A + 6I"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[var(--input-bg)]
                border
                border-[var(--input-border)]
                text-[var(--text-main)]
                outline-none
              "
            />
          </label>
        )}
      </div>

      <p className="mt-4 text-[var(--text-muted)] text-xs leading-6">
        Use A, I, powers with ^, and terms like 3A, 6I.
      </p>
    </div>
  );
}