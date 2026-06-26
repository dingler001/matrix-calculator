import MatrixGrid from "./MatrixGrid";

function createBlankMatrix(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "")
  );
}

function createFilledMatrix(size) {
  let count = 1;
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => String(count++))
  );
}

export default function MatrixCard({
  title,
  matrix,
  setMatrix,
  matrixSize,
  updateSize,
  matrixName,
}) {
  const handleFill = () => {
    setMatrix(createFilledMatrix(matrixSize));
  };

  const handleClear = () => {
    setMatrix(createBlankMatrix(matrixSize));
  };

  const handleIncrease = () => {
    updateSize(Math.min(matrixSize + 1, 10));
  };

  const handleDecrease = () => {
    updateSize(Math.max(matrixSize - 1, 2));
  };

  return (
    <div className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-[var(--panel-border)]
      bg-[var(--panel-bg)]
      backdrop-blur-xl
      p-5
      transition-all
      duration-300
    ">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h2 className="text-lg lg:text-xl font-semibold text-[var(--text-main)]">
              {title}
            </h2>
          </div>

          <select
            value={matrixSize}
            onChange={(e) => updateSize(Number(e.target.value))}
            className="
              px-3
              py-2
              rounded-lg
              bg-[var(--input-bg)]
              border
              border-[var(--input-border)]
              text-[var(--text-main)]
              text-sm
              outline-none
            "
          >
            {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => (
              <option key={n} value={n}>
                {n} × {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center gap-2.5 overflow-auto rounded-2xl border border-[var(--panel-border)] bg-[color-mix(in_srgb,var(--panel-bg-solid)_70%,transparent)] p-3 lg:p-4">
          <div className="text-purple-500 text-5xl leading-none select-none">
            (
          </div>

          <MatrixGrid
            matrix={matrix}
            setMatrix={setMatrix}
            matrixName={matrixName}
          />

          <div className="text-purple-500 text-5xl leading-none select-none">
            )
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleFill}
            className="
              px-3
              py-2
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-blue-500
              hover:text-[var(--text-main)]
              transition
            "
          >
            Fill
          </button>

          <button
            onClick={handleClear}
            className="
              px-3
              py-2
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-blue-500
              hover:text-[var(--text-main)]
              transition
            "
          >
            Clear
          </button>

          <button
            onClick={handleIncrease}
            className="
              px-3
              py-2
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-blue-500
              hover:text-[var(--text-main)]
              transition
            "
          >
            +
          </button>

          <button
            onClick={handleDecrease}
            className="
              px-3
              py-2
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-blue-500
              hover:text-[var(--text-main)]
              transition
            "
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
}