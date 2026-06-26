export default function CalculateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        py-4
        rounded-2xl
        text-base
        lg:text-lg
        font-semibold
        text-white
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        transition-all
        duration-300
        hover:scale-[1.01]
        hover:shadow-[0_0_32px_rgba(59,130,246,0.32)]
      "
    >
      Calculate
    </button>
  );
}