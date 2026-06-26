export default function OperationCard({
  title,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl
        px-3
        py-3
        text-sm
        font-medium
        transition-all
        duration-300
        min-h-[58px]
        ${
          selected
            ? "bg-blue-600 text-white shadow-[0_0_18px_rgba(59,130,246,0.35)]"
            : "bg-[var(--panel-bg-solid)] text-[var(--text-soft)] border border-[var(--panel-border)] hover:border-blue-500 hover:scale-[1.01]"
        }
      `}
    >
      {title}
    </button>
  );
}