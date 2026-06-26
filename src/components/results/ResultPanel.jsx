import MatrixResult from "./MatrixResult";

function serializeResult(result) {
  if (Array.isArray(result)) {
    return result
      .map((row) => row.map((value) => String(value)).join("\t"))
      .join("\n");
  }

  return String(result ?? "");
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default function ResultPanel({ result }) {
  const hasResult = result !== "" && result !== null && result !== undefined;

  const handleCopy = async () => {
    const text = serializeResult(result);
    if (!text.trim()) return;
    await navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const text = serializeResult(result);
    if (!text.trim()) return;
    downloadTextFile("matrix-result.txt", text);
  };

  const handleShare = async () => {
    const text = serializeResult(result);
    if (!text.trim()) return;

    if (navigator.share) {
      await navigator.share({
        title: "Matrix Result",
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);
    }
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <h2 className="text-xl lg:text-2xl font-semibold text-[var(--text-main)]">
            Result
          </h2>
        </div>

        <div
          className="
            rounded-2xl
            bg-[var(--panel-bg-solid)]
            border
            border-[var(--panel-border)]
            p-5
            min-h-[220px]
            flex
            items-center
            justify-center
            overflow-auto
          "
        >
          {hasResult ? (
            <MatrixResult result={result} />
          ) : (
            <div className="text-[var(--text-muted)] text-sm lg:text-base">
              Waiting for calculation
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
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
              hover:border-blue-500
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
              hover:border-blue-500
              transition
            "
          >
            TXT
          </button>

          <button
            onClick={handleShare}
            className="
              px-3
              py-2.5
              rounded-lg
              bg-[var(--panel-bg-solid)]
              border
              border-[var(--panel-border)]
              text-[var(--text-soft)]
              text-sm
              hover:border-blue-500
              transition
            "
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}