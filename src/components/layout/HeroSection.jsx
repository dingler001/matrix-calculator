export default function HeroSection() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[var(--panel-border)]
        bg-[var(--panel-bg)]
        backdrop-blur-xl
        px-5
        py-4
      "
    >
      <div
        className="
          absolute
          right-4
          top-0
          w-40
          h-40
          rounded-full
          bg-blue-500/10
          blur-[90px]
          pointer-events-none
        "
      />

      <div className="relative z-10 flex items-center gap-4">
        <div
          className="
            flex
            items-center
            justify-center
            w-11
            h-11
            rounded-2xl
            border
            border-[var(--panel-border)]
            bg-[var(--panel-bg-solid)]
            text-blue-500
            text-xl
            shrink-0
          "
        >
          ✦
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-main)] leading-tight">
            Matrix Calculator
          </h1>
          <p className="text-[var(--text-muted)] text-sm lg:text-base mt-1">
            Perform various matrix operations with ease
          </p>
        </div>

        <div className="ml-auto hidden xl:flex items-center gap-2">
          <span
            className="
              px-3
              py-1.5
              rounded-full
              border
              border-[var(--panel-border)]
              bg-[var(--panel-bg-solid)]
              text-[var(--text-soft)]
              text-xs
            "
          >
            Clean UI
          </span>

          <span
            className="
              px-3
              py-1.5
              rounded-full
              border
              border-[var(--panel-border)]
              bg-[var(--panel-bg-solid)]
              text-[var(--text-soft)]
              text-xs
            "
          >
            Fast
          </span>
        </div>
      </div>
    </div>
  );
}