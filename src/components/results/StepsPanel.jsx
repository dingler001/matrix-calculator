function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default function StepsPanel({ steps }) {
  const hasSteps = steps !== "" && steps !== null && steps !== undefined;

  const handleCopy = async () => {
    const text = String(steps ?? "");
    if (!text.trim()) return;
    await navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const text = String(steps ?? "");
    if (!text.trim()) return;
    downloadTextFile("matrix-steps.txt", text);
  };

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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <h2 className="text-xl lg:text-2xl font-semibold text-[var(--text-main)]">
            Solution Steps
          </h2>
        </div>

        <div
          className="
            min-h-[220px]
            rounded-2xl
            bg-[var(--panel-bg-solid)]
            border
            border-[var(--panel-border)]
            p-4
            text-[var(--text-soft)]
            whitespace-pre-wrap
            leading-6
            font-mono
            text-[13px]
            overflow-auto
          "
        >
          {hasSteps ? steps : "Steps will appear here after calculation."}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={handleCopy}
            className="
              px-3
              py-2.5
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-purple-500
              transition
            "
          >
            Copy
          </button>

          <button
            onClick={handleDownload}
            className="
              px-3
              py-2.5
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-purple-500
              transition
            "
          >
            TXT
          </button>
        </div>
      </div>
    </div>
  );
}