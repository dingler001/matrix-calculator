export default function MatrixInput({
  value,
  onChange,
  row,
  col,
  matrixName,
  onNavigate,
}) {
  const handleKeyDown = (e) => {
    if (!onNavigate) return;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        onNavigate(row - 1, col);
        break;
      case "ArrowDown":
        e.preventDefault();
        onNavigate(row + 1, col);
        break;
      case "ArrowLeft":
        e.preventDefault();
        onNavigate(row, col - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        onNavigate(row, col + 1);
        break;
      case "Enter":
        e.preventDefault();
        onNavigate(row + 1, col);
        break;
      default:
        break;
    }
  };

  return (
    <input
      type="number"
      step="any"
      inputMode="decimal"
      value={value}
      onWheel={(e) => e.currentTarget.blur()}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      data-matrix={matrixName}
      data-row={row}
      data-col={col}
      className="
        w-20
        h-12
        rounded-lg
        bg-[var(--input-bg)]
        border
        border-[var(--input-border)]
        text-center
        text-[var(--text-main)]
        text-sm
        outline-none
        transition-all
        duration-300
        hover:border-blue-500
        hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]
        focus:border-blue-500
        focus:shadow-[0_0_16px_rgba(59,130,246,0.35)]
      "
    />
  );
}