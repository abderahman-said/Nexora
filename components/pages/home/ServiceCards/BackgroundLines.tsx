export default function BackgroundLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-40"
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-100 200 C 300 50, 700 350, 1300 150"
        stroke="url(#serviceWave1)"
        strokeWidth="2"
      />
      <path
        d="M-100 280 C 400 100, 800 380, 1300 220"
        stroke="url(#serviceWave2)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />
      <defs>
        <linearGradient id="serviceWave1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="serviceWave2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
