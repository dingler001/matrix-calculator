function formatValue(value) {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    return String(value);
  }

  const rounded = Math.abs(num) < 1e-12 ? 0 : Number(num.toFixed(4));
  const text = rounded.toFixed(4);
  return text.replace(/\.?0+$/, "");
}

export default function MatrixResult({ result }) {
  const isMatrix =
    Array.isArray(result) && Array.isArray(result[0]);

  if (!isMatrix) {
    return (
      <div className="text-center whitespace-pre-wrap max-w-full">
        <div className="text-white text-[15px] lg:text-base font-medium break-words whitespace-pre-wrap leading-7 font-mono">
          {typeof result === "number"
            ? formatValue(result)
            : String(result ?? "")}
        </div>
      </div>
    );
  }

  const cols = result[0].length;

  const cellClass =
    cols <= 3
      ? "w-14 h-11 text-sm"
      : cols <= 5
      ? "w-12 h-10 text-xs"
      : "w-10 h-8 text-[11px]";

  return (
    <div className="flex items-center justify-center gap-2.5 overflow-auto max-w-full">
      <div className="text-purple-500 text-5xl leading-none select-none">
        (
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {result.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                ${cellClass}
                rounded-md
                bg-slate-900
                border
                border-slate-700
                flex
                items-center
                justify-center
                text-white
                font-medium
              `}
            >
              {formatValue(value)}
            </div>
          ))
        )}
      </div>

      <div className="text-purple-500 text-5xl leading-none select-none">
        )
      </div>
    </div>
  );
}