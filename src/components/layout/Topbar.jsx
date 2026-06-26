export default function Topbar() {
  return (
    <div
      className="
        h-20
        px-8
        border-b
        border-slate-800
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h2 className="text-white text-xl font-semibold">
          Matrix Calculator
        </h2>
        <p className="text-slate-500 text-sm">
          Professional matrix operations
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
            px-4
            py-2
            rounded-xl
            bg-slate-900
            border
            border-slate-800
            text-white
          "
        >
          Dark
        </button>

        <button
          className="
            px-5
            py-2
            rounded-xl
            bg-blue-600
            text-white
            hover:scale-[1.03]
            transition
          "
        >
          Pro
        </button>
      </div>
    </div>
  );
}