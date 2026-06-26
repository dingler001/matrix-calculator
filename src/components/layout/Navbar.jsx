import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="h-18 border-b border-[var(--panel-border)] px-5 lg:px-8 flex items-center justify-between bg-[var(--panel-bg)] backdrop-blur-xl">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-[var(--panel-bg-solid)] border border-[var(--panel-border)] text-[var(--text-main)] text-lg hover:border-blue-500 transition"
          title="Toggle theme"
        >
          {darkMode ? "☾" : "☀"}
        </button>

        <div className="min-w-0">
          <h2 className="text-xl lg:text-2xl font-semibold text-[var(--text-main)] truncate">
            Matrix Calculator
          </h2>
          <p className="text-[var(--text-muted)] text-xs lg:text-sm truncate">
            Perform various matrix operations with ease
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <button className="px-4 py-2 rounded-xl bg-[var(--panel-bg-solid)] text-[var(--text-main)] border border-[var(--panel-border)] text-sm">
          EN ▾
        </button>

        <button className="px-4 lg:px-5 py-2 rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-500/10 transition text-sm">
          Sign In
        </button>
      </div>
    </header>
  );
}