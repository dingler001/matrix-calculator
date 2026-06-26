import { useState } from "react";
import operationCategories from "../../data/operationCategories";
import OperationCard from "./OperationCard";
import { useMatrixContext } from "../../context/MatrixContext";

export default function OperationPanel() {
  const { selectedOperation, setSelectedOperation } = useMatrixContext();
  const [showMore, setShowMore] = useState(false);

  const extraOps = [
    "Scalar Multiply",
    "AX = B Solver",
    "Polynomial Equations",
    "Matrix Power",
    "Row Echelon Form",
    "LU Decomposition",
    "Cholesky Decomposition",
    "Eigenvalues Calculator",
  ];

  return (
    <div className="
      rounded-2xl
      border
      border-[var(--panel-border)]
      bg-[var(--panel-bg)]
      backdrop-blur-xl
      p-5
      overflow-hidden
      relative
    ">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <h2 className="text-xl lg:text-2xl font-semibold text-[var(--text-main)]">
            Choose Operation
          </h2>
        </div>

        <div className="space-y-5">
          {operationCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-[11px] uppercase tracking-[0.24em] text-blue-500 mb-3">
                {category.title}
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.operations.map((operation) => (
                  <OperationCard
                    key={operation}
                    title={operation}
                    selected={selectedOperation === operation}
                    onClick={() => setSelectedOperation(operation)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-[var(--text-muted)] text-sm truncate">
            {selectedOperation}
          </div>

          <button
            onClick={() => setShowMore((value) => !value)}
            className="
              px-4
              py-2
              rounded-xl
              border
              border-[var(--panel-border)]
              bg-[var(--panel-bg-solid)]
              text-[var(--text-soft)]
              text-sm
              hover:border-blue-500
              transition
            "
          >
            More
          </button>
        </div>

        {showMore && (
          <div className="mt-4 rounded-2xl border border-[var(--panel-border)] bg-[color-mix(in_srgb,var(--panel-bg-solid)_92%,transparent)] p-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {extraOps.map((operation) => (
                <OperationCard
                  key={operation}
                  title={operation}
                  selected={selectedOperation === operation}
                  onClick={() => setSelectedOperation(operation)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}