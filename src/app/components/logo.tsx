export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="reflowGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#86EFAC" />
            <stop offset="1" stopColor="#4ADE80" />
          </linearGradient>
        </defs>
        {/* infinity/8 form */}
        <path
          d="M9 14c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z"
          stroke="url(#reflowGrad)"
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M9 14c0 3-2 5-4.5 5S0 17 0 14s2-5 4.5-5S9 11 9 14z"
          stroke="url(#reflowGrad)"
          strokeWidth="2.2"
          fill="none"
          transform="translate(9 0)"
        />
      </svg>
      <span className="tracking-tight" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>
        Refl<span style={{ color: "#4ADE80" }}>o</span>w
      </span>
    </div>
  );
}
