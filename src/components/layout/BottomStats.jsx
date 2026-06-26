export default function BottomStats() {
  return (
    <div className="mt-8 grid md:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-[var(--panel-border)] p-4 bg-[var(--panel-bg)]">
        <h3 className="text-blue-500 font-semibold text-sm mb-1">
          Keyboard Friendly
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-6">
          Move through matrices with arrows and Enter.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--panel-border)] p-4 bg-[var(--panel-bg)]">
        <h3 className="text-purple-500 font-semibold text-sm mb-1">
          Detailed Steps
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-6">
          Every result shows the math behind it.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--panel-border)] p-4 bg-[var(--panel-bg)]">
        <h3 className="text-cyan-500 font-semibold text-sm mb-1">
          NxN Support
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-6">
          Use 2×2 up to larger square matrices.
        </p>
      </div>
    </div>
  );
}