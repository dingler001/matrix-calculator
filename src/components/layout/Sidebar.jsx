import { sidebarItems } from "../../data/sidebarItems";
import { useMatrixContext } from "../../context/MatrixContext";

export default function Sidebar() {
  const { selectedOperation, setSelectedOperation } = useMatrixContext();

  return (
    <aside
      className="
        w-[250px]
        xl:w-[280px]
        shrink-0
        h-screen
        sticky
        top-0
        flex
        flex-col
        bg-[var(--panel-bg)]
        border-r
        border-[var(--panel-border)]
        overflow-hidden
      "
    >
      <div className="px-5 py-4 border-b border-[var(--panel-border)]">
        <h1 className="text-xl font-bold text-[var(--text-main)]">
          MatrixMaster
        </h1>
        <p className="text-[var(--text-muted)] text-[11px] mt-1">
          Advanced matrix toolkit
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {sidebarItems.map((section) => (
          <div key={section.category} className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] mb-3">
              {section.category}
            </p>

            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedOperation(item)}
                  className={`
                    w-full
                    text-left
                    px-4
                    py-2.5
                    rounded-xl
                    text-[14px]
                    transition-all
                    duration-300
                    ${
                      selectedOperation === item
                        ? "bg-blue-600 text-white shadow-[0_0_22px_rgba(59,130,246,0.22)]"
                        : "bg-[var(--panel-bg-solid)] text-[var(--text-soft)] hover:bg-[color-mix(in_srgb,var(--panel-bg-solid)_84%,white)] hover:text-[var(--text-main)] hover:translate-x-1"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--panel-border)] px-5 py-4">
        <p className="text-[var(--text-muted)] text-[11px]">
          MatrixMaster v1.0
        </p>
      </div>
    </aside>
  );
}