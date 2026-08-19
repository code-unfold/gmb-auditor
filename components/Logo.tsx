export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gmba-pin" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2470CE" />
            <stop offset="1" stopColor="#0F9960" />
          </linearGradient>
        </defs>
        {/* Map pin */}
        <path
          d="M20 3C12.8 3 7 8.8 7 16c0 9.1 11.2 19.4 12.2 20.3a1.2 1.2 0 0 0 1.6 0C21.8 35.4 33 25.1 33 16 33 8.8 27.2 3 20 3Z"
          fill="url(#gmba-pin)"
        />
        {/* Checkmark */}
        <path
          d="M13.5 16.5l4.4 4.4 8.6-8.6"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            inverted ? "text-white" : "text-brand-900"
          }`}
        >
          GMB <span className="text-brand-500">Auditor</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
            inverted ? "text-brand-200" : "text-brand-400"
          }`}
        >
          by Auxilium Technology
        </span>
      </span>
    </span>
  );
}
