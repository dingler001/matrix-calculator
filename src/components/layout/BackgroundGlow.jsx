import { useTheme } from "../../context/ThemeContext";

export default function BackgroundGlow() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className="
          fixed
          top-0
          left-0
          w-[420px]
          h-[420px]
          rounded-full
          pointer-events-none
          blur-[140px]
        "
        style={{
          background: darkMode ? "rgba(59, 130, 246, 0.08)" : "rgba(96, 165, 250, 0.10)",
        }}
      />
      <div
        className="
          fixed
          bottom-0
          right-0
          w-[420px]
          h-[420px]
          rounded-full
          pointer-events-none
          blur-[140px]
        "
        style={{
          background: darkMode ? "rgba(139, 92, 246, 0.08)" : "rgba(167, 139, 250, 0.10)",
        }}
      />
    </>
  );
}