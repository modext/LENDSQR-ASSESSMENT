/**
 * Login page illustration - abstract figure and shapes per Figma.
 */

export function LoginIllustration() {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="login-illustration"
      aria-hidden
    >
      {/* Open frame */}
      <rect x="180" y="120" width="280" height="320" stroke="#213F7D" strokeWidth="2" fill="none" rx="4" />
      {/* Person - simplified figure */}
      <ellipse cx="320" cy="280" rx="50" ry="55" fill="#E5E5E5" />
      <circle cx="320" cy="250" r="35" fill="#E5E5E5" />
      <rect x="285" y="335" width="70" height="80" rx="8" fill="#6EE7B7" />
      <rect x="270" y="415" width="100" height="25" rx="4" fill="#FDE047" />
      <rect x="250" y="260" width="45" height="50" rx="4" fill="#7DD3FC" />
      <rect x="345" y="255" width="60" height="45" rx="4" fill="#213F7D" />
      {/* Glasses */}
      <circle cx="305" cy="255" r="12" stroke="#213F7D" strokeWidth="2" fill="none" />
      <circle cx="335" cy="255" r="12" stroke="#213F7D" strokeWidth="2" fill="none" />
      <line x1="317" y1="255" x2="323" y2="255" stroke="#213F7D" strokeWidth="2" />
      {/* Yellow ring */}
      <circle cx="480" cy="420" r="70" fill="none" stroke="#FDE047" strokeWidth="12" />
      {/* Pink shape */}
      <path
        d="M420 380 Q500 350 520 420 Q480 480 420 450 Z"
        fill="#F9A8D4"
        fillOpacity="0.9"
      />
      {/* Blue block */}
      <rect x="380" y="320" width="50" height="45" rx="4" fill="#3B82F6" />
      <path d="M380 320 L410 290 L460 290 L430 320 Z" fill="#F9A8D4" />
      <circle cx="450" cy="310" r="15" fill="#FDE047" />
      {/* Pill shape */}
      <rect x="140" y="280" width="80" height="25" rx="12" fill="#7DD3FC" />
      {/* Star */}
      <path
        d="M160 200 L165 215 L180 215 L168 224 L172 238 L160 230 L148 238 L152 224 L140 215 L155 215 Z"
        fill="#FDE047"
      />
      {/* Green trapezoid */}
      <path d="M480 240 L540 240 L520 290 L500 290 Z" fill="#86EFAC" />
      {/* Speech bubble */}
      <rect x="200" y="180" width="80" height="30" rx="8" fill="#FBCFE8" />
      <line x1="230" y1="210" x2="245" y2="225" stroke="#FBCFE8" strokeWidth="2" />
      <line x1="215" y1="195" x2="215" y2="195" stroke="#94A3B8" strokeWidth="1" />
      <line x1="255" y1="195" x2="255" y2="195" stroke="#94A3B8" strokeWidth="1" />
      {/* Grass / flowers */}
      <path d="M120 520 L130 480 L140 520 L150 470 L160 520" stroke="#22C55E" strokeWidth="3" fill="none" />
      <circle cx="135" cy="465" r="5" fill="#FDE047" />
      <circle cx="155" cy="460" r="5" fill="#FDE047" />
    </svg>
  );
}
